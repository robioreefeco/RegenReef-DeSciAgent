import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Heart, 
  Eye, 
  Zap,
  Beaker,
  Dna,
  Microscope,
  Atom,
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  Target,
  Waves,
  Fish,
  Thermometer,
  Shield,
  Activity
} from 'lucide-react';

interface Molecule {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: 'sunscreen' | 'antioxidant' | 'antimicrobial' | 'growth-factor' | 'ph-buffer' | 'enzyme';
  source: string;
  coralSpecies: string[];
  bioactivity: {
    protection: number;
    regeneration: number;
    resilience: number;
  };
  structure: string; // SVG or molecular representation
  applications: string[];
  researchStatus: 'discovered' | 'testing' | 'validated' | 'commercial';
  likes: number;
  views: number;
  downloads: number;
  publishedDate: string;
  researchers: string[];
  tags: string[];
  aiGenerated: boolean;
  efficacy: number;
  sustainability: number;
  image: string;
}

export const MoleculeExplorer: React.FC = () => {
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [filteredMolecules, setFilteredMolecules] = useState<Molecule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'efficacy' | 'likes'>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);

  const categories = [
    { id: 'all', name: 'All Molecules', icon: Atom, count: 0 },
    { id: 'sunscreen', name: 'UV Protection', icon: Shield, count: 0 },
    { id: 'antioxidant', name: 'Antioxidants', icon: Zap, count: 0 },
    { id: 'antimicrobial', name: 'Antimicrobials', icon: Microscope, count: 0 },
    { id: 'growth-factor', name: 'Growth Factors', icon: TrendingUp, count: 0 },
    { id: 'ph-buffer', name: 'pH Buffers', icon: Beaker, count: 0 },
    { id: 'enzyme', name: 'Enzymes', icon: Dna, count: 0 },
  ];

  // Mock data for coral reef biotech molecules
  useEffect(() => {
    const mockMolecules: Molecule[] = [
      {
        id: '1',
        name: 'Mycosporine-like Amino Acid (MAA-334)',
        formula: 'C13H20N2O8',
        description: 'Natural UV-absorbing compound found in coral tissues that provides protection against harmful solar radiation and helps prevent coral bleaching.',
        category: 'sunscreen',
        source: 'Symbiodinium algae',
        coralSpecies: ['Acropora cervicornis', 'Porites astreoides'],
        bioactivity: { protection: 95, regeneration: 70, resilience: 85 },
        structure: 'molecular-structure-1',
        applications: ['Coral restoration', 'UV protection', 'Bleaching prevention'],
        researchStatus: 'validated',
        likes: 1247,
        views: 8934,
        downloads: 456,
        publishedDate: '2024-01-15',
        researchers: ['Dr. Marina Coral', 'Prof. James Reef'],
        tags: ['UV protection', 'natural', 'symbiotic'],
        aiGenerated: false,
        efficacy: 94,
        sustainability: 98,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        name: 'Coral Antioxidant Complex (CAC-7)',
        formula: 'C21H32O12',
        description: 'AI-designed antioxidant compound that mimics natural coral defense mechanisms against oxidative stress and thermal shock.',
        category: 'antioxidant',
        source: 'AI-generated',
        coralSpecies: ['Montastraea cavernosa', 'Diploria strigosa'],
        bioactivity: { protection: 88, regeneration: 92, resilience: 90 },
        structure: 'molecular-structure-2',
        applications: ['Thermal stress protection', 'Oxidative damage repair', 'Coral farming'],
        researchStatus: 'testing',
        likes: 892,
        views: 5621,
        downloads: 234,
        publishedDate: '2024-02-03',
        researchers: ['Dr. Sarah Ocean', 'AI Research Team'],
        tags: ['AI-generated', 'antioxidant', 'thermal protection'],
        aiGenerated: true,
        efficacy: 89,
        sustainability: 85,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        name: 'Reef Regeneration Factor (RRF-12)',
        formula: 'C18H24N4O6',
        description: 'Bioactive peptide that accelerates coral tissue regeneration and promotes new polyp formation in damaged reef structures.',
        category: 'growth-factor',
        source: 'Coral mucus extract',
        coralSpecies: ['Staghorn coral', 'Brain coral'],
        bioactivity: { protection: 65, regeneration: 96, resilience: 78 },
        structure: 'molecular-structure-3',
        applications: ['Coral transplantation', 'Wound healing', 'Reef restoration'],
        researchStatus: 'commercial',
        likes: 2156,
        views: 12847,
        downloads: 789,
        publishedDate: '2023-11-20',
        researchers: ['Dr. Reef Restoration', 'Marine Biotech Lab'],
        tags: ['regeneration', 'peptide', 'commercial'],
        aiGenerated: false,
        efficacy: 96,
        sustainability: 92,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '4',
        name: 'Carbonic Anhydrase Enhancer (CAE-9)',
        formula: 'C16H19N3O4Zn',
        description: 'Zinc-based enzyme enhancer that improves coral calcification rates and helps maintain skeletal integrity under ocean acidification.',
        category: 'enzyme',
        source: 'Modified coral enzyme',
        coralSpecies: ['Elkhorn coral', 'Star coral'],
        bioactivity: { protection: 82, regeneration: 74, resilience: 94 },
        structure: 'molecular-structure-4',
        applications: ['Ocean acidification resistance', 'Calcification enhancement', 'Skeletal repair'],
        researchStatus: 'validated',
        likes: 1543,
        views: 9876,
        downloads: 567,
        publishedDate: '2024-01-08',
        researchers: ['Dr. Calcium Coral', 'Ocean Chemistry Lab'],
        tags: ['enzyme', 'calcification', 'acidification'],
        aiGenerated: false,
        efficacy: 91,
        sustainability: 88,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '5',
        name: 'Probiotic Defense Compound (PDC-3)',
        formula: 'C14H22N2O5',
        description: 'Antimicrobial compound that promotes beneficial bacterial communities while inhibiting pathogenic microorganisms in coral microbiomes.',
        category: 'antimicrobial',
        source: 'Coral-associated bacteria',
        coralSpecies: ['Table coral', 'Finger coral'],
        bioactivity: { protection: 90, regeneration: 68, resilience: 87 },
        structure: 'molecular-structure-5',
        applications: ['Disease prevention', 'Microbiome balance', 'Probiotic therapy'],
        researchStatus: 'testing',
        likes: 734,
        views: 4521,
        downloads: 189,
        publishedDate: '2024-02-14',
        researchers: ['Dr. Micro Marine', 'Coral Health Institute'],
        tags: ['antimicrobial', 'probiotic', 'microbiome'],
        aiGenerated: false,
        efficacy: 85,
        sustainability: 94,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '6',
        name: 'pH Stabilizer Complex (PSC-15)',
        formula: 'C12H16N2O8Ca',
        description: 'Calcium-based buffering system that maintains optimal pH levels in coral tissues during environmental stress events.',
        category: 'ph-buffer',
        source: 'Synthetic coral analog',
        coralSpecies: ['Plate coral', 'Mushroom coral'],
        bioactivity: { protection: 86, regeneration: 72, resilience: 91 },
        structure: 'molecular-structure-6',
        applications: ['pH regulation', 'Stress mitigation', 'Water chemistry control'],
        researchStatus: 'discovered',
        likes: 456,
        views: 2834,
        downloads: 123,
        publishedDate: '2024-02-28',
        researchers: ['Dr. Buffer Bay', 'Chemical Ecology Lab'],
        tags: ['pH buffer', 'calcium', 'stress response'],
        aiGenerated: true,
        efficacy: 83,
        sustainability: 90,
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];

    setMolecules(mockMolecules);
    setFilteredMolecules(mockMolecules);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = molecules;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(molecule => molecule.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(molecule =>
        molecule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        molecule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        molecule.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'efficacy':
          return b.efficacy - a.efficacy;
        case 'likes':
          return b.likes - a.likes;
        case 'trending':
        default:
          return (b.views + b.likes) - (a.views + a.likes);
      }
    });

    setFilteredMolecules(filtered);
  }, [molecules, selectedCategory, searchTerm, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'validated': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'discovered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Atom;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <Dna className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  ReefMolecules
                </h1>
                <p className="text-gray-600 text-sm">Coral Conservation Biotech Database</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Beaker className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{filteredMolecules.length} molecules</span>
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search molecules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const count = category.id === 'all' 
                    ? molecules.length 
                    : molecules.filter(m => m.category === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { id: 'trending', name: 'Trending', icon: TrendingUp },
                  { id: 'newest', name: 'Newest', icon: Clock },
                  { id: 'efficacy', name: 'Efficacy', icon: Target },
                  { id: 'likes', name: 'Most Liked', icon: Heart }
                ].map((sort) => {
                  const Icon = sort.icon;
                  return (
                    <button
                      key={sort.id}
                      onClick={() => setSortBy(sort.id as any)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        sortBy === sort.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{sort.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'All Molecules' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-gray-500">({filteredMolecules.length} results)</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="h-0.5 bg-current rounded"></div>
                    <div className="h-0.5 bg-current rounded"></div>
                    <div className="h-0.5 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Molecules Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredMolecules.map((molecule) => {
                const CategoryIcon = getCategoryIcon(molecule.category);
                
                return (
                  <div
                    key={molecule.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedMolecule(molecule)}
                  >
                    {viewMode === 'grid' ? (
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                              <CategoryIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {molecule.name}
                              </h3>
                              <p className="text-sm text-gray-500">{molecule.formula}</p>
                            </div>
                          </div>
                          {molecule.aiGenerated && (
                            <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                              <Zap className="h-3 w-3" />
                              <span>AI</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {molecule.description}
                        </p>

                        {/* Bioactivity Bars */}
                        <div className="space-y-2 mb-4">
                          {Object.entries(molecule.bioactivity).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-3">
                              <span className="text-xs font-medium text-gray-600 w-20 capitalize">
                                {key}
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${value}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 w-8">
                                {value}%
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Status and Stats */}
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(molecule.researchStatus)}`}>
                            {molecule.researchStatus}
                          </span>
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span className="text-xs">{molecule.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span className="text-xs">{molecule.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                              {molecule.name}
                            </h3>
                            {molecule.aiGenerated && (
                              <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                <Zap className="h-3 w-3" />
                                <span>AI</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{molecule.formula}</p>
                          <p className="text-gray-600 text-sm line-clamp-2">{molecule.description}</p>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-500 flex-shrink-0">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{molecule.efficacy}%</div>
                            <div className="text-xs">Efficacy</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{molecule.likes}</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredMolecules.length === 0 && (
              <div className="text-center py-16">
                <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No molecules found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Molecule Detail Modal */}
      {selectedMolecule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center">
                    {React.createElement(getCategoryIcon(selectedMolecule.category), {
                      className: "h-8 w-8 text-blue-600"
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMolecule.name}</h2>
                    <p className="text-lg text-gray-600">{selectedMolecule.formula}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMolecule.researchStatus)}`}>
                        {selectedMolecule.researchStatus}
                      </span>
                      {selectedMolecule.aiGenerated && (
                        <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          <Zap className="h-4 w-4" />
                          <span>AI Generated</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMolecule(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedMolecule.description}</p>
                  </div>

                  {/* Bioactivity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Bioactivity Profile</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedMolecule.bioactivity).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700 w-24 capitalize">
                            {key}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 w-12">
                            {value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMolecule.applications.map((app, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{selectedMolecule.likes}</div>
                        <div className="text-sm text-gray-600">Likes</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{selectedMolecule.views}</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Download className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{selectedMolecule.downloads}</div>
                        <div className="text-sm text-gray-600">Downloads</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{selectedMolecule.efficacy}%</div>
                        <div className="text-sm text-gray-600">Efficacy</div>
                      </div>
                    </div>
                  </div>

                  {/* Coral Species */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Coral Species</h3>
                    <div className="space-y-2">
                      {selectedMolecule.coralSpecies.map((species, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-teal-50 rounded-lg">
                          <Fish className="h-4 w-4 text-teal-600" />
                          <span className="text-sm text-teal-800 italic">{species}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Researchers */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Team</h3>
                    <div className="space-y-2">
                      {selectedMolecule.researchers.map((researcher, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{researcher}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                    <BookOpen className="h-5 w-5" />
                    <span>Research Paper</span>
                  </button>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Download Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};