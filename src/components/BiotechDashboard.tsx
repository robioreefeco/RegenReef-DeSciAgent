import React, { useState } from 'react';
import { Microscope, Beaker, Dna, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface BiotechMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export const BiotechDashboard: React.FC = () => {
  const [metrics] = useState<BiotechMetric[]>([
    {
      id: '1',
      name: 'Coral Polyp Density',
      value: 847,
      unit: 'polyps/cm²',
      status: 'optimal',
      trend: 'up',
      change: 12.5
    },
    {
      id: '2',
      name: 'Symbiodinium Count',
      value: 2.4,
      unit: 'million/cm²',
      status: 'warning',
      trend: 'down',
      change: -8.2
    },
    {
      id: '3',
      name: 'Protein Expression',
      value: 94.2,
      unit: '%',
      status: 'optimal',
      trend: 'stable',
      change: 0.8
    },
    {
      id: '4',
      name: 'Genetic Diversity Index',
      value: 0.73,
      unit: 'HDI',
      status: 'critical',
      trend: 'down',
      change: -15.3
    }
  ]);

  const getStatusColor = (status: BiotechMetric['status']) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: BiotechMetric['status']) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: BiotechMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-0.5 bg-gray-400"></div>;
      default: return <div className="w-4 h-0.5 bg-gray-400"></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Microscope className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Biotech Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Beaker className="w-5 h-5 text-purple-600" />
          <Dna className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{metric.name}</h3>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {getStatusIcon(metric.status)}
                <span className="capitalize">{metric.status}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{metric.unit}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${
                  metric.change > 0 ? 'text-green-600' : 
                  metric.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">Research Insights</h3>
        <p className="text-sm text-purple-700">
          Current biomarkers indicate moderate stress in symbiotic relationships. 
          Recommend increasing calcium supplementation and monitoring temperature fluctuations.
        </p>
      </div>
    </div>
  );
};