import React from 'react';
import { Settings, RefreshCw, PauseCircle, PlayCircle } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onRefresh: () => void;
  chartType: 'line' | 'area';
  onChartTypeChange: (type: 'line' | 'area') => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onToggleRunning,
  onRefresh,
  chartType,
  onChartTypeChange,
  showGrid,
  onToggleGrid,
  color,
  onColorChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-lg shadow-sm">
      <button
        onClick={onToggleRunning}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isRunning ? (
          <>
            <PauseCircle size={20} /> Pause
          </>
        ) : (
          <>
            <PlayCircle size={20} /> Start
          </>
        )}
      </button>

      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <RefreshCw size={20} /> Reset
      </button>

      <div className="flex items-center gap-2">
        <Settings size={20} className="text-gray-600" />
        <select
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value as 'line' | 'area')}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="line">Line Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showGrid}
          onChange={onToggleGrid}
          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
        />
        Show Grid
      </label>
    </div>
  );
};