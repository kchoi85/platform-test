// 'use client';

// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { DOWNTOWN_TORONTO_CENTER_COORDS } from '@/app/constants';
// import { useGetAllProperties } from '@/app/hooks';
// import { renderAndFitMarkers, showBoundsWithLatLng } from './utils/map.utils';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// interface MapboxMapProps {
//   pageHeight: string;
//   latitude?: number;
//   longitude?: number;
//   onMapClick?: (lat: number, lng: number) => void;
// }

// export const MapboxMap: React.FC<MapboxMapProps> = ({
//   pageHeight,
//   latitude,
//   longitude,
//   onMapClick,
// }) => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markerRef = useRef<mapboxgl.Marker | null>(null);
//   const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

//   const { properties } = useGetAllProperties();

//   // Initialize the map
//   useEffect(() => {
//     if (mapContainerRef.current && !mapRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [
//           longitude || DOWNTOWN_TORONTO_CENTER_COORDS[0],
//           latitude || DOWNTOWN_TORONTO_CENTER_COORDS[1],
//         ],
//         zoom: 12,
//       });

//       mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

//       // When the map is clicked, update the form values.
//       mapRef.current.on('click', (e) => {
//         const { lng, lat } = e.lngLat;
//         onMapClick?.(lat, lng);
//       });
//     }
//   }, [onMapClick]);

//   const showAllMarkers = !latitude && !longitude;

//   if (showAllMarkers) {
//     // render all markers and fit the correct bounds
//     useEffect(() => {
//       renderAndFitMarkers({
//         mapRef,
//         markersRef,
//         properties,
//       });
//     }, [properties]);
//   } else {
//     useEffect(() => {
//       // show default map (e.g. admin / properties create)
//       showBoundsWithLatLng({
//         mapRef,
//         markerRef,
//         latitude,
//         longitude,
//       });
//     }, [latitude, longitude]);
//   }

//   return (
//     <div ref={mapContainerRef} style={{ width: '100%', height: pageHeight }} />
//   );
// };
'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '@/app/constants';
import { useGetAllProperties } from '@/app/hooks';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapboxMapProps {
  pageHeight: string;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({ pageHeight }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { properties } = useGetAllProperties();

  // Initialize the map once
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: DOWNTOWN_TORONTO_CENTER_COORDS,
        zoom: 12,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Attach cluster click events once the map has loaded
      mapRef.current.on('load', () => {
        mapRef.current?.on('click', 'clusters', (e) => {
          const features = mapRef.current!.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });
          if (!features.length) return;
          const clusterId = features[0].properties?.cluster_id;
          const source = mapRef.current!.getSource(
            'properties'
          ) as mapboxgl.GeoJSONSource;
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            mapRef.current!.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
        });

        // Change the cursor to a pointer when over clusters
        mapRef.current?.on('mouseenter', 'clusters', () => {
          mapRef.current!.getCanvas().style.cursor = 'pointer';
        });
        mapRef.current?.on('mouseleave', 'clusters', () => {
          mapRef.current!.getCanvas().style.cursor = '';
        });
      });
    }
  }, []);

  // Update (or add) the GeoJSON source with clustering when properties change
  useEffect(() => {
    if (!mapRef.current || !properties) return;

    // Convert your properties to GeoJSON format
    const geojson = {
      type: 'FeatureCollection',
      features: properties.map((property) => ({
        type: 'Feature',
        properties: {
          id: property.id,
          title: property.title,
          // Add other property fields here if needed
        },
        geometry: {
          type: 'Point',
          coordinates: [property.longitude, property.latitude],
        },
      })),
    };

    // If the source already exists, update its data
    const existingSource = mapRef.current.getSource(
      'properties'
    ) as mapboxgl.GeoJSONSource;
    if (existingSource) {
      existingSource.setData(geojson);
    } else {
      // Ensure the map style is loaded before adding a new source/layers
      const addGeoJsonSourceAndLayers = () => {
        if (!mapRef.current) return;

        mapRef.current.addSource('properties', {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14, // max zoom to cluster points on
          clusterRadius: 50, // radius of each cluster (in pixels)
        });

        // Layer for clustered points (circles)
        mapRef.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'properties',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': '#51bbd6',
            'circle-radius': 20,
          },
        });

        // Layer for cluster counts (text labels)
        mapRef.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'properties',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
        });

        // Layer for individual, unclustered points
        mapRef.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'properties',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': 'crimson',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
        });
      };

      if (mapRef.current.isStyleLoaded()) {
        addGeoJsonSourceAndLayers();
      } else {
        mapRef.current.on('load', addGeoJsonSourceAndLayers);
      }
    }
  }, [properties]);

  // Fit map bounds to all markers from the raw properties
  useEffect(() => {
    if (!mapRef.current || !properties || properties.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    properties.forEach((property) => {
      if (property.longitude != null && property.latitude != null) {
        bounds.extend([property.longitude, property.latitude]);
      }
    });

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, { padding: 50, duration: 0 });
    }
  }, [properties]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: pageHeight }} />
  );
};
