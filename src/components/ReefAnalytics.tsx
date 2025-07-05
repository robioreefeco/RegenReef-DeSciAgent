import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Thermometer,
  MapPin,
  Eye,
  Fish,
  Waves,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AnalyticsData {
  metric: string;
  current: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  chartData: number[];
  unit: string;
}

interface ReefComparison {
  name: string;
  location: string;
  value: number;
  change: number;
  status: 'improving' | 'declining' | 'stable';
  coordinates: [number, number];
}

export const ReefAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('coral-cover');
  const [viewMode, setViewMode] = useState<'charts' | 'map' | 'comparison'>('charts');

  const metrics = [
    { id: 'coral-cover', label: 'Coral Cover', icon: BarChart3, color: 'blue' },
    { id: 'temperature', label: 'Water Temperature', icon: Thermometer, color: 'red' },
    { id: 'biodiversity', label: 'Biodiversity Index', icon: Fish, color: 'green' },
    { id: 'health-score', label: 'Health Score', icon: Activity, color: 'purple' },
    { id: 'ph-level', label: 'pH Level', icon: Waves, color: 'teal' },
    { id: 'visibility', label: 'Water Clarity', icon: Eye, color: 'yellow' },
  ];

  const timeRanges = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: '1y', label: '1 year' },
    { value: '5y', label: '5 years' },
  ];

  const analyticsData: Record<string, AnalyticsData> = {
    'coral-cover': {
      metric: 'Coral Coverage',
      current: 68.5,
      change: 2.3,
      trend: 'up',
      chartData: [62, 64, 63, 66, 67, 68, 69, 68.5, 70, 69.2, 68.8, 68.5],
      unit: '%'
    },
    'temperature': {
      metric: 'Water Temperature',
      current: 27.2,
      change: -0.8,
      trend: 'down',
      chartData: [28.1, 28.2, 28.0, 27.8, 27.5, 27.3, 27.2, 27.1, 27.0, 27.1, 27.2, 27.2],
      unit: '°C'
    },
    'biodiversity': {
      metric: 'Biodiversity Index',
      current: 0.78,
      change: 0.05,
      trend: 'up',
      chartData: [0.72, 0.74, 0.73, 0.75, 0.76, 0.77, 0.78, 0.79, 0.78, 0.77, 0.78, 0.78],
      unit: ''
    },
    'health-score': {
      metric: 'Overall Health Score',
      current: 82.4,
      change: 5.2,
      trend: 'up',
      chartData: [76, 78, 77, 79, 80, 81, 82, 82.4, 83, 82.8, 82.5, 82.4],
      unit: '%'
    },
    'ph-level': {
      metric: 'pH Level',
      current: 8.1,
      change: -0.2,
      trend: 'down',
      chartData: [8.3, 8.2, 8.3, 8.2, 8.1, 8.0, 8.1, 8.1, 8.0, 8.1, 8.1, 8.1],
      unit: ''
    },
    'visibility': {
      metric: 'Water Clarity',
      current: 22.5,
      change: 1.8,
      trend: 'up',
      chartData: [18, 19, 20, 21, 22, 21, 22, 23, 22.5, 23, 22.8, 22.5],
      unit: 'm'
    }
  };

  const reefComparison: ReefComparison[] = [
    { 
      name: 'Great Barrier Reef', 
      location: 'Australia',
      value: 75, 
      change: 2.1, 
      status: 'improving',
      coordinates: [-16.2839, 145.7781]
    },
    { 
      name: 'Caribbean Reefs', 
      location: 'Caribbean Sea',
      value: 45, 
      change: -1.2, 
      status: 'declining',
      coordinates: [18.2208, -66.5901]
    },
    { 
      name: 'Red Sea Reefs', 
      location: 'Egypt',
      value: 58, 
      change: 0.8, 
      status: 'stable',
      coordinates: [27.2946, 33.8116]
    },
    { 
      name: 'Maldives Reefs', 
      location: 'Indian Ocean',
      value: 82, 
      change: 3.2, 
      status: 'improving',
      coordinates: [3.2028, 73.2207]
    },
    { 
      name: 'Hawaii Reefs', 
      location: 'Pacific Ocean',
      value: 64, 
      change: 1.5, 
      status: 'improving',
      coordinates: [21.3099, -157.8581]
    },
    { 
      name: 'Coral Triangle', 
      location: 'Indonesia',
      value: 39, 
      change: -2.8, 
      status: 'declining',
      coordinates: [-0.7893, 113.9213]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'declining': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improving': return <TrendingUp className="w-4 h-4" />;
      case 'declining': return <TrendingDown className="w-4 h-4" />;
      case 'stable': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const currentData = analyticsData[selectedMetric];
  const selectedMetricInfo = metrics.find(m => m.id === selectedMetric);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reef Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive analysis of coral reef health trends and patterns</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'charts', label: 'Charts & Trends', icon: BarChart3 },
          { id: 'map', label: 'Global Map', icon: MapPin },
          { id: 'comparison', label: 'Reef Comparison', icon: PieChart }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Charts & Trends View */}
      {viewMode === 'charts' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Time Range:</span>
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedMetric === metric.id
                          ? `bg-${metric.color}-100 text-${metric.color}-700 border border-${metric.color}-200`
                          : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{metric.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  {selectedMetricInfo && React.createElement(selectedMetricInfo.icon, { className: "w-5 h-5" })}
                  <span>{currentData.metric} Trends</span>
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {currentData.current.toFixed(1)}{currentData.unit}
                    </span>
                    <div className={`flex items-center space-x-1 ${
                      currentData.trend === 'up' ? 'text-green-600' : 
                      currentData.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {currentData.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : currentData.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Activity className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(currentData.change).toFixed(1)}{currentData.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Chart */}
            <div className="h-80 flex items-end justify-between space-x-1 bg-gradient-to-t from-gray-50 to-white rounded-lg p-4">
              {currentData.chartData.map((value, index) => {
                const maxValue = Math.max(...currentData.chartData);
                const minValue = Math.min(...currentData.chartData);
                const normalizedHeight = ((value - minValue) / (maxValue - minValue)) * 100;
                
                return (
                  <div
                    key={index}
                    className={`bg-${selectedMetricInfo?.color || 'blue'}-500 rounded-t-lg transition-all duration-300 hover:bg-${selectedMetricInfo?.color || 'blue'}-600 cursor-pointer relative group`}
                    style={{
                      height: `${Math.max(normalizedHeight, 5)}%`,
                      width: `${100 / currentData.chartData.length - 1}%`
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value.toFixed(1)}{currentData.unit}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend */}
            <div className="mt-4 flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 bg-${selectedMetricInfo?.color || 'blue'}-500 rounded`}></div>
                <span>{currentData.metric}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span>Baseline</span>
              </div>
            </div>
          </div>

          {/* Additional Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.filter(m => m.id !== selectedMetric).slice(0, 3).map((metric) => {
              const data = analyticsData[metric.id];
              const Icon = metric.icon;
              
              return (
                <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium text-gray-900">{metric.label}</h4>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      data.trend === 'up' ? 'text-green-600' : 
                      data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {data.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : data.trend === 'down' ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <Activity className="h-3 w-3" />
                      )}
                      <span className="text-xs font-medium">
                        {Math.abs(data.change).toFixed(1)}{data.unit}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {data.current.toFixed(1)}{data.unit}
                  </div>
                  
                  {/* Mini chart */}
                  <div className="h-12 flex items-end justify-between space-x-0.5">
                    {data.chartData.slice(-8).map((value, index) => {
                      const maxValue = Math.max(...data.chartData.slice(-8));
                      const minValue = Math.min(...data.chartData.slice(-8));
                      const normalizedHeight = ((value - minValue) / (maxValue - minValue)) * 100;
                      
                      return (
                        <div
                          key={index}
                          className={`bg-${metric.color}-400 rounded-t`}
                          style={{
                            height: `${Math.max(normalizedHeight, 10)}%`,
                            width: '12%'
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Global Map View */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Global Map</h3>
          <p className="text-gray-600 mb-4">
            For the full interactive mapping experience with ArcGIS integration, 
            please visit the dedicated Global Map section.
          </p>
          <button 
            onClick={() => window.location.hash = '#map'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Global Map
          </button>
        </div>
      )}

      {/* Reef Comparison View */}
      {viewMode === 'comparison' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Global Reef Comparison</h3>
          <div className="space-y-4">
            {reefComparison.map((reef, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Waves className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{reef.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{reef.location}</span>
                      <div className={`flex items-center space-x-1 ${
                        reef.change > 0 ? 'text-green-600' : 
                        reef.change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {reef.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : reef.change < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : (
                          <Activity className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">{Math.abs(reef.change)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{reef.value}%</div>
                    <div className="text-xs text-gray-500">Health Score</div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        reef.value >= 70 ? 'bg-green-500' :
                        reef.value >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${reef.value}%` }}
                    ></div>
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reef.status)}`}>
                    {getStatusIcon(reef.status)}
                    <span className="capitalize">{reef.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};