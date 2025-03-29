'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import { useState, useCallback, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  DOWNTOWN_TORONTO_CENTER_COORDS,
  LEAFLET_MAP_DARK_MODE_URL,
  LEAFLET_MAP_LIGHT_MODE_URL,
} from '../constants';
import dynamic from 'next/dynamic';
import { MapControlPanel } from './components/map-control-panel.component';
import { MapSidePanel } from './components/map-side-panel.component';

// Dynamically import MapEventHandler only on the client side.
const DynamicMapEventHandler = dynamic(
  () => import('./components').then((mod) => mod.MapEventHandler),
  { ssr: false }
);

export default function MapsPage() {
  const [center, setCenter] = useState<number[]>(
    DOWNTOWN_TORONTO_CENTER_COORDS
  );
  const [bounds, setBounds] = useState(null);
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window === 'undefined') return true;

    const savedMode = localStorage?.getItem('lightMode');
    return savedMode ? savedMode === 'true' : true; // default to light mode if not set
  });

  useEffect(() => {
    localStorage?.setItem('lightMode', String(isLightMode));
  }, [isLightMode]);

  const mapTileUrl = isLightMode
    ? LEAFLET_MAP_LIGHT_MODE_URL
    : LEAFLET_MAP_DARK_MODE_URL;

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  // Memoize the callback to prevent unnecessary re-renders.
  const handleBoundsChange = useCallback((newBounds) => {
    setBounds(newBounds);
    const newCenter = newBounds.getCenter();
    setCenter([newCenter.lat, newCenter.lng]);
  }, []);

  // Optionally, prevent rendering on the server.
  if (typeof window === 'undefined') return null;

  return (
    <main className="flex h-screen">
      {/* Left panel: Leaflet Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={mapTileUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <DynamicMapEventHandler onBoundsChange={handleBoundsChange} />
        </MapContainer>
      </div>

      <MapControlPanel
        isLightMode={isLightMode}
        onToggleLightMode={toggleLightMode}
      />
      <MapSidePanel bounds={bounds} center={center} />
    </main>
  );
}
