'use client';

import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

export function MapEventHandler({ onBoundsChange }) {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds());
    },
  });

  // Capture the initial bounds once the map loads.
  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, [map, onBoundsChange]);

  return null;
}
