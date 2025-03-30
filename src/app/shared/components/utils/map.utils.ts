'use client';

import { Property } from '@prisma/client';
import mapboxgl from 'mapbox-gl';

interface RenderAndFitMarkersProps {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  markersRef: React.MutableRefObject<Map<string, mapboxgl.Marker>>;
  properties: Property[] | undefined;
}

export function renderAndFitMarkers({
  mapRef,
  markersRef,
  properties,
}: RenderAndFitMarkersProps) {
  if (mapRef.current && properties) {
    // Remove existing property markers.
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Create a new bounds object.
    const bounds = new mapboxgl.LngLatBounds();

    // Add a marker for each property with valid coordinates.
    properties.forEach((property) => {
      if (property.latitude != null && property.longitude != null) {
        const marker = new mapboxgl.Marker({ color: 'crimson' })
          .setLngLat([property.longitude, property.latitude])
          .addTo(mapRef.current!);
        markersRef.current.set(String(property.id), marker);
        bounds.extend([property.longitude, property.latitude]);
      }
    });

    // If we have at least one property marker, adjust the map's bounds.
    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds, { padding: 100, duration: 0 });
    }
  }
}

interface ShowBoundsWithLatLngProps {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  markerRef: React.MutableRefObject<mapboxgl.Marker | null>;
  latitude: number | undefined;
  longitude: number | undefined;
}

export function showBoundsWithLatLng({
  mapRef,
  markerRef,
  latitude,
  longitude,
}: ShowBoundsWithLatLngProps) {
  if (mapRef.current) {
    mapRef.current.setCenter([longitude, latitude]);

    if (markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude]);
    } else {
      markerRef.current = new mapboxgl.Marker({ color: 'crimson' })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
    }
  }
}
