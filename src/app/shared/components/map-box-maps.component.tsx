'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '@/app/constants';
import { useGetAllProperties } from '@/app/hooks';
import { renderAndFitMarkers, showBoundsWithLatLng } from './utils/map.utils';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapboxMapProps {
  pageHeight: string;
  latitude?: number;
  longitude?: number;
  onMapClick?: (lat: number, lng: number) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({
  pageHeight,
  latitude,
  longitude,
  onMapClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  const { properties } = useGetAllProperties();

  // Initialize the map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [
          longitude || DOWNTOWN_TORONTO_CENTER_COORDS[0],
          latitude || DOWNTOWN_TORONTO_CENTER_COORDS[1],
        ],
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

  const showAllMarkers = !latitude && !longitude;

  if (showAllMarkers) {
    // render all markers and fit the correct bounds
    useEffect(() => {
      renderAndFitMarkers({
        mapRef,
        markersRef,
        properties,
      });
    }, [properties]);
  } else {
    useEffect(() => {
      // show default map (e.g. admin / properties create)
      showBoundsWithLatLng({
        mapRef,
        markerRef,
        latitude,
        longitude,
      });
    }, [latitude, longitude]);
  }

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: pageHeight }} />
  );
};
