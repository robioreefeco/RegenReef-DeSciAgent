import React from 'react';
import { 
  Atom, 
  Zap, 
  Shield, 
  TrendingUp, 
  Star,
  Download,
  Eye,
  Heart
} from 'lucide-react';

interface BiotechMoleculeCardProps {
  molecule: {
    id: string;
    name: string;
    formula: string;
    category: string;
    efficacy: number;
    status: 'discovered' | 'testing' | 'validated' | 'commercial';
    likes: number;
    views: number;
    downloads: number;
    aiGenerated?: boolean;
  };
  onClick?: () => void;
}

export const BiotechMoleculeCard: React.FC<BiotechMoleculeCardProps> = ({ molecule, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'commercial': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'validated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'testing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'discovered': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sunscreen': return Shield;
      case 'antioxidant': return Zap;
      case 'growth-factor': return TrendingUp;
      default: return Atom;
    }
  };

  const CategoryIcon = getCategoryIcon(molecule.category);

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Coral-inspired gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-pink-50/20 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* AI Generated Badge */}
      {molecule.aiGenerated && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Zap className="h-3 w-3" />
            <span>AI</span>
          </div>
        </div>
      )}
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <CategoryIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
              {molecule.name}
            </h3>
            <p className="text-sm text-gray-600 font-mono">{molecule.formula}</p>
          </div>
        </div>

        {/* Efficacy Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Efficacy</span>
            <span className="text-sm font-bold text-gray-900">{molecule.efficacy}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 transition-all duration-500 group-hover:animate-pulse"
              style={{ width: `${molecule.efficacy}%` }}
            ></div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(molecule.status)}`}>
            <Star className="h-3 w-3 mr-1" />
            {molecule.status}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4 text-red-400" />
            <span>{molecule.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4 text-blue-400" />
            <span>{molecule.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="h-4 w-4 text-green-400" />
            <span>{molecule.downloads}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </div>
  );
};