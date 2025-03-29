'use client';

import {
  DOWNTOWN_TORONTO_CENTER_COORDS,
  // MAPBOX_MAP_DARK_MODE_URL,
  // MAPBOX_MAP_LIGHT_MODE_URL,
} from '../constants';
import { MapControlPanel } from './components/map-control-panel.component';
import { MapSidePanel } from './components/map-side-panel.component';
import { MapboxMap } from '../shared/components';
import { useState } from 'react';

export default function MapsPage() {
  const [center, setCenter] = useState(DOWNTOWN_TORONTO_CENTER_COORDS);
  const [bounds, setBounds] = useState(null);

  // useEffect(() => {
  //   localStorage?.setItem('lightMode', String(isLightMode));
  // }, [isLightMode]);

  if (typeof window === 'undefined') return null;

  return (
    <main className="flex h-screen">
      <MapboxMap
        pageHeight={'100%'}
        latitude={DOWNTOWN_TORONTO_CENTER_COORDS[0]}
        longitude={DOWNTOWN_TORONTO_CENTER_COORDS[1]}
      />
      <MapSidePanel bounds={bounds} center={DOWNTOWN_TORONTO_CENTER_COORDS} />
    </main>
  );
}
