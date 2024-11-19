import React, { useState, useEffect, useCallback } from 'react';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { Controls } from './components/Controls';

interface DataPoint {
  timestamp: number;
  value: number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [showGrid, setShowGrid] = useState(true);
  const [color, setColor] = useState('#2563eb');

  const generateDataPoint = useCallback(() => {
    const now = Date.now();
    return {
      timestamp: now,
      value: Math.sin(now / 1000) * 10 + Math.random() * 5,
    };
  }, []);

  const addDataPoint = useCallback(() => {
    setData((currentData) => {
      const newPoint = generateDataPoint();
      const newData = [...currentData, newPoint];
      // Keep last 50 points
      return newData.slice(-50);
    });
  }, [generateDataPoint]);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(addDataPoint, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, addDataPoint]);

  const handleRefresh = () => {
    setData([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Real-Time Data Visualization
            </h1>
            <p className="text-gray-600 mt-2">
              Interactive time series visualization with real-time updates
            </p>
          </div>

          <Controls
            isRunning={isRunning}
            onToggleRunning={() => setIsRunning(!isRunning)}
            onRefresh={handleRefresh}
            chartType={chartType}
            onChartTypeChange={setChartType}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            color={color}
            onColorChange={setColor}
          />

          <div className="p-6">
            <TimeSeriesChart
              data={data}
              chartType={chartType}
              color={color}
              showGrid={showGrid}
            />
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p>Total Data Points: {data.length}</p>
                <p>Update Frequency: 1 second</p>
              </div>
              <div>
                <p>Chart Type: {chartType.charAt(0).toUpperCase() + chartType.slice(1)}</p>
                <p>Grid: {showGrid ? 'Visible' : 'Hidden'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;