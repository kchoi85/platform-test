interface MapControlPanelProps {
  isLightMode: boolean;
  onToggleLightMode: () => void;
}

export function MapControlPanel({
  isLightMode,
  onToggleLightMode,
}: MapControlPanelProps) {
  return (
    <div className="absolute bottom-5 left-[40%] transform -translate-x-1/2 w-11/12 max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg p-4 z-999">
      <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-2"></div>
      <h2 className="text-lg font-semibold text-center">Control Panel</h2>
      <p
        className="text-sm text-center text-gray-600 hover:text-gray-900 cursor-pointer"
        onClick={onToggleLightMode}
      >
        {isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </p>
    </div>
  );
}
