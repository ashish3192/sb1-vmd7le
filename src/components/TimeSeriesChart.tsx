import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface TimeSeriesChartProps {
  data: DataPoint[];
  chartType: 'line' | 'area';
  color: string;
  showGrid: boolean;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  chartType,
  color,
  showGrid,
}) => {
  const formatXAxis = (timestamp: number) => {
    return format(new Date(timestamp), 'HH:mm:ss');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600">{format(new Date(label), 'PPpp')}</p>
          <p className="text-gray-800 font-semibold">
            Value: {payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      {chartType === 'line' ? (
        <LineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            type="number"
            domain={['auto', 'auto']}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            name="Value"
          />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            type="number"
            domain={['auto', 'auto']}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            fill={color}
            stroke={color}
            name="Value"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};