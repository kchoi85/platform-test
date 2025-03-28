'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import { useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '../constants';
import dynamic from 'next/dynamic';

// Dynamically import MapEventHandler only on the client side.
const DynamicMapEventHandler = dynamic(
  () => import('./components/').then((mod) => mod.MapEventHandler),
  { ssr: false }
);

export default function MapsPage() {
  const [center, setCenter] = useState(DOWNTOWN_TORONTO_CENTER_COORDS);
  const [bounds, setBounds] = useState(null);

  // IMPORTANT: Memoize the callback to prevent unnecessary re-renders.
  const handleBoundsChange = useCallback((newBounds) => {
    setBounds(newBounds);
    const newCenter = newBounds.getCenter();
    setCenter([newCenter.lat, newCenter.lng]);
  }, []);

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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <DynamicMapEventHandler onBoundsChange={handleBoundsChange} />
        </MapContainer>
      </div>

      {/* Right side panel */}
      <aside className="w-1/4 bg-white shadow p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Map Boundaries</h2>
        {bounds ? (
          <div>
            <p>
              <strong>SouthWest:</strong> {bounds.getSouthWest().lat.toFixed(4)}
              , {bounds.getSouthWest().lng.toFixed(4)}
            </p>
            <p>
              <strong>NorthEast:</strong> {bounds.getNorthEast().lat.toFixed(4)}
              , {bounds.getNorthEast().lng.toFixed(4)}
            </p>
            <p>
              <strong>Center:</strong> {center[0].toFixed(4)},{' '}
              {center[1].toFixed(4)}
            </p>
          </div>
        ) : (
          <p>Move the map to see boundaries.</p>
        )}
      </aside>
    </main>
  );
}
