'use client';

import { useState, useCallback, useEffect } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  DOWNTOWN_TORONTO_CENTER_COORDS,
  MAPBOX_MAP_DARK_MODE_URL,
  MAPBOX_MAP_LIGHT_MODE_URL,
} from '../constants';
import { MapControlPanel } from './components/map-control-panel.component';
import { MapSidePanel } from './components/map-side-panel.component';

export default function MapsPage() {
  const [center, setCenter] = useState(DOWNTOWN_TORONTO_CENTER_COORDS);
  const [bounds, setBounds] = useState(null);
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedMode = localStorage?.getItem('lightMode');
    return savedMode ? savedMode === 'true' : true;
  });

  useEffect(() => {
    localStorage?.setItem('lightMode', String(isLightMode));
  }, [isLightMode]);

  const mapStyle = isLightMode
    ? MAPBOX_MAP_LIGHT_MODE_URL
    : MAPBOX_MAP_DARK_MODE_URL;

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  const handleMoveEnd = useCallback((event) => {
    // event.target is the map instance; get the new center and bounds.
    const mapInstance = event.target;
    const { lat, lng } = mapInstance.getCenter();
    setCenter([lat, lng]);
    setBounds(mapInstance.getBounds());
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <main className="flex h-screen">
      <div className="flex-1 relative">
        <Map
          initialViewState={{
            latitude: center[0],
            longitude: center[1],
            zoom: 13,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyle}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          onMoveEnd={handleMoveEnd}
        >
          <NavigationControl position="top-right" />
        </Map>
      </div>

      <MapControlPanel
        isLightMode={isLightMode}
        onToggleLightMode={toggleLightMode}
      />
      <MapSidePanel bounds={bounds} center={center} />
    </main>
  );
}
