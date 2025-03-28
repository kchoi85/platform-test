interface MapSidePanelProps {
  bounds: any;
  center: any;
}

export function MapSidePanel({ bounds, center }: MapSidePanelProps) {
  return (
    <aside className="w-1/4 bg-white p-4 overflow-y-auto shadow-xl z-999">
      <h2 className="text-xl font-bold mb-4">Map Boundaries</h2>
      {bounds ? (
        <div>
          <p>
            <strong>SouthWest:</strong> {bounds.getSouthWest().lat.toFixed(4)},{' '}
            {bounds.getSouthWest().lng.toFixed(4)}
          </p>
          <p>
            <strong>NorthEast:</strong> {bounds.getNorthEast().lat.toFixed(4)},{' '}
            {bounds.getNorthEast().lng.toFixed(4)}
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
  );
}
