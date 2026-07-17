import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { BookmarkInsight } from './types';

// Custom tooltip for the impact chart
export const ImpactTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="p-3 shadow-lg">
        <div className="text-sm font-medium text-foreground mb-2">{data.fullName}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant="secondary" className="text-xs">
              {data.type === 'created' ? 'New' : 'Updated'}
            </Badge>
          </div>
          {data.type === 'edited' && data.escalationImpact !== 0 && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Escalation Impact:</span>
              <span className="text-muted-foreground">
                {data.escalationImpact < 0 ? '' : '+'}{data.escalationImpact}%
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Automation Boost:</span>
            <span className="text-muted-foreground">+{data.automationRateIncrease}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Queries Resolved:</span>
            <span className="text-foreground">{data.queriesResolved}</span>
          </div>
        </div>
      </Card>
    );
  }
  return null;
};

// Custom tooltip for timeline chart
export const TimelineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-3 shadow-lg">
        <div className="text-sm font-medium text-foreground mb-2">
          {label === 0 ? 'Today' : `${label} days ago`}
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Escalation Rate:</span>
            <span className="text-foreground">{payload[0]?.value}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Automation Rate:</span>
            <span className="text-foreground">{payload[1]?.value}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Articles Published:</span>
            <span className="text-foreground">{payload[2]?.value}</span>
          </div>
        </div>
      </Card>
    );
  }
  return null;
};

// Render mini chart component
export const MiniChart = ({ insight, isDetailView = false }: { insight: BookmarkInsight; isDetailView?: boolean }) => {
  if (!insight.chartData || !insight.chartType) return null;

  const chartHeight = isDetailView ? 320 : 80;

  switch (insight.chartType) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={insight.chartData}>
            {isDetailView && (
              <>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip />
              </>
            )}
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#666666"
              strokeWidth={isDetailView ? 3 : 2}
              dot={isDetailView ? { fill: "#666666", strokeWidth: 2, r: 4 } : false}
            />
            <Line
              type="monotone"
              dataKey="satisfaction"
              stroke="#999999"
              strokeWidth={isDetailView ? 3 : 2}
              dot={isDetailView ? { fill: "#999999", strokeWidth: 2, r: 4 } : false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={insight.chartData}>
            {isDetailView && (
              <>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip />
              </>
            )}
            <Bar dataKey="escalations" fill="#888888" radius={2} />
          </BarChart>
        </ResponsiveContainer>
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <PieChart
              data={insight.chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={15}
              outerRadius={35}
              paddingAngle={2}
            >
              {insight.chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </PieChart>
          </PieChart>
        </ResponsiveContainer>
      );
    case 'area':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart data={insight.chartData}>
            {isDetailView && (
              <>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip />
              </>
            )}
            <Area
              type="monotone"
              dataKey="escalation"
              stackId="1"
              stroke="#666666"
              fill="#666666"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="automation"
              stackId="2"
              stroke="#999999"
              fill="#999999"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};