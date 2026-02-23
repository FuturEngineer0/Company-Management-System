import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Widget, WidgetHeader, WidgetBody } from './Widget';
import '../Style/ChartWidget.css';

interface ChartWidgetProps {
  id: string;
  title: string;
  data: Record<string, number>;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ id, title, data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <Widget id={id} title={title}>
      <WidgetHeader />
      <WidgetBody>
        <p className="chart-subtitle">Current stock levels per category</p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.55} />
                  <stop offset="55%" stopColor="#2563eb" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.07)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 8 }}
                interval={0}
                dy={8}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  color: '#e2e8f0',
                  fontSize: '13px',
                }}
                labelStyle={{ color: '#a5b4fc', fontWeight: 600 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                barSize={36}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetBody>
    </Widget>
  );
};
