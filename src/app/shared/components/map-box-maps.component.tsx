// MapboxMap.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '@/app/constants';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapboxMapProps {
  pageHeight: string;
  latitude?: number;
  longitude?: number;
  onMapClick?: (lat: number, lng: number) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({
  pageHeight,
  latitude = DOWNTOWN_TORONTO_CENTER_COORDS[0],
  longitude = DOWNTOWN_TORONTO_CENTER_COORDS[1],
  onMapClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize the map on mount.
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 12,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // When the map is clicked, update the form values.
      mapRef.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        onMapClick?.(lat, lng);
      });
    }
  }, [onMapClick]);

  // Update map center and marker when latitude/longitude change.
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([longitude, latitude]);

      const existingMarker = markerRef.current;
      if (existingMarker) {
        existingMarker.setLngLat([longitude, latitude]);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
      }
    }
  }, [latitude, longitude]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: pageHeight }} />
  );
};
