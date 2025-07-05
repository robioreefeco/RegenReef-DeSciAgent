import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Droplets, Sun, AlertCircle } from 'lucide-react';

interface HealthMetric {
  name: string;
  value: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  icon: React.ReactNode;
  unit: string;
}

export const CoralHealthIndicator: React.FC = () => {
  const [overallHealth, setOverallHealth] = useState(78);
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      name: 'Temperature',
      value: 26.5,
      status: 'good',
      icon: <Thermometer className="w-5 h-5" />,
      unit: '°C'
    },
    {
      name: 'pH Level',
      value: 8.2,
      status: 'excellent',
      icon: <Droplets className="w-5 h-5" />,
      unit: 'pH'
    },
    {
      name: 'Light Intensity',
      value: 85,
      status: 'good',
      icon: <Sun className="w-5 h-5" />,
      unit: '%'
    },
    {
      name: 'Bleaching Risk',
      value: 23,
      status: 'fair',
      icon: <AlertCircle className="w-5 h-5" />,
      unit: '%'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.2
      })));
      
      setOverallHealth(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    if (health >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 80) return 'bg-green-100';
    if (health >= 60) return 'bg-yellow-100';
    if (health >= 40) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-pink-600" />
          <h2 className="text-2xl font-bold text-gray-800">Coral Health Monitor</h2>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700">Overall Health Score</span>
          <span className={`text-2xl font-bold ${getHealthColor(overallHealth)}`}>
            {Math.round(overallHealth)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              overallHealth >= 80 ? 'bg-green-500' :
              overallHealth >= 60 ? 'bg-yellow-500' :
              overallHealth >= 40 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallHealth}%` }}
          ></div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-gray-600">
                  {metric.icon}
                </div>
                <span className="font-medium text-gray-700">{metric.name}</span>
              </div>
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status}
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800">
              {metric.value.toFixed(1)} {metric.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Health Status Summary */}
      <div className={`mt-6 p-4 rounded-lg ${getHealthBgColor(overallHealth)}`}>
        <h3 className={`font-semibold mb-2 ${getHealthColor(overallHealth)}`}>
          Health Status: {overallHealth >= 80 ? 'Excellent' : overallHealth >= 60 ? 'Good' : overallHealth >= 40 ? 'Fair' : 'Poor'}
        </h3>
        <p className={`text-sm ${getHealthColor(overallHealth)}`}>
          {overallHealth >= 80 
            ? 'Coral ecosystem is thriving with optimal conditions maintained.'
            : overallHealth >= 60 
            ? 'Coral health is stable with minor environmental fluctuations.'
            : overallHealth >= 40 
            ? 'Coral showing signs of stress. Monitor closely and consider interventions.'
            : 'Critical coral health status. Immediate action required to prevent bleaching.'
          }
        </p>
      </div>
    </div>
  );
};