import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Camera, 
  Thermometer, 
  Droplets, 
  Sun, 
  Fish,
  Save,
  X,
  CheckCircle
} from 'lucide-react';

interface SurveyField {
  id: string;
  type: 'text' | 'number' | 'select' | 'date' | 'photo' | 'coordinates';
  label: string;
  required: boolean;
  options?: string[];
}

interface Survey {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  fields: SurveyField[];
  status: 'draft' | 'active' | 'completed';
}

export const SurveyCreator: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Coral Health Assessment',
      description: 'Comprehensive coral reef health evaluation',
      location: 'Great Barrier Reef',
      date: '2024-01-15',
      status: 'active',
      fields: [
        { id: '1', type: 'coordinates', label: 'Survey Location', required: true },
        { id: '2', type: 'number', label: 'Water Temperature (°C)', required: true },
        { id: '3', type: 'number', label: 'Coral Coverage (%)', required: true },
        { id: '4', type: 'select', label: 'Bleaching Level', required: true, options: ['None', 'Mild', 'Moderate', 'Severe'] }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSurvey, setNewSurvey] = useState<Partial<Survey>>({
    title: '',
    description: '',
    location: '',
    fields: []
  });

  const predefinedFields: SurveyField[] = [
    { id: 'temp', type: 'number', label: 'Water Temperature (°C)', required: true },
    { id: 'ph', type: 'number', label: 'pH Level', required: true },
    { id: 'depth', type: 'number', label: 'Depth (m)', required: true },
    { id: 'coverage', type: 'number', label: 'Coral Coverage (%)', required: true },
    { id: 'bleaching', type: 'select', label: 'Bleaching Level', required: true, options: ['None', 'Mild', 'Moderate', 'Severe'] },
    { id: 'species', type: 'number', label: 'Fish Species Count', required: false },
    { id: 'visibility', type: 'number', label: 'Visibility (m)', required: false },
    { id: 'photo', type: 'photo', label: 'Site Photo', required: false },
    { id: 'notes', type: 'text', label: 'Additional Notes', required: false }
  ];

  const addFieldToSurvey = (field: SurveyField) => {
    const newField = { ...field, id: Date.now().toString() };
    setNewSurvey(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
  };

  const removeFieldFromSurvey = (fieldId: string) => {
    setNewSurvey(prev => ({
      ...prev,
      fields: prev.fields?.filter(f => f.id !== fieldId) || []
    }));
  };

  const createSurvey = () => {
    if (!newSurvey.title || !newSurvey.location) return;

    const survey: Survey = {
      id: Date.now().toString(),
      title: newSurvey.title,
      description: newSurvey.description || '',
      location: newSurvey.location,
      date: new Date().toISOString().split('T')[0],
      fields: newSurvey.fields || [],
      status: 'draft'
    };

    setSurveys(prev => [...prev, survey]);
    setNewSurvey({ title: '', description: '', location: '', fields: [] });
    setShowCreateModal(false);
  };

  const getStatusColor = (status: Survey['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFieldIcon = (type: SurveyField['type']) => {
    switch (type) {
      case 'number': return <Thermometer className="w-4 h-4" />;
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'coordinates': return <MapPin className="w-4 h-4" />;
      case 'date': return <Calendar className="w-4 h-4" />;
      default: return <Fish className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Survey Creator</h2>
          <p className="text-gray-600">Create and manage reef monitoring surveys</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Survey</span>
        </button>
      </div>

      {/* Surveys List */}
      <div className="grid gap-4">
        {surveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
                <p className="text-gray-600 text-sm">{survey.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{survey.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{survey.date}</span>
                  </div>
                  <span>{survey.fields.length} fields</span>
                </div>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {survey.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {survey.fields.slice(0, 6).map((field) => (
                <div key={field.id} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                  {getFieldIcon(field.type)}
                  <span>{field.label}</span>
                </div>
              ))}
              {survey.fields.length > 6 && (
                <span className="text-xs text-gray-500">+{survey.fields.length - 6} more</span>
              )}
            </div>

            <div className="flex space-x-3">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                Edit
              </button>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
                Deploy
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                View Data
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Survey Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create New Survey</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Survey Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Survey Title *
                    </label>
                    <input
                      type="text"
                      value={newSurvey.title || ''}
                      onChange={(e) => setNewSurvey(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Coral Health Assessment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newSurvey.description || ''}
                      onChange={(e) => setNewSurvey(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Brief description of the survey purpose"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={newSurvey.location || ''}
                      onChange={(e) => setNewSurvey(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Great Barrier Reef - Heron Island"
                    />
                  </div>

                  {/* Available Fields */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Available Fields</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {predefinedFields.map((field) => (
                        <button
                          key={field.id}
                          onClick={() => addFieldToSurvey(field)}
                          className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            {getFieldIcon(field.type)}
                            <span className="text-sm font-medium">{field.label}</span>
                          </div>
                          <Plus className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Fields */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Survey Fields ({newSurvey.fields?.length || 0})
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {newSurvey.fields?.map((field, index) => (
                      <div key={field.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-blue-800">{index + 1}.</span>
                          {getFieldIcon(field.type)}
                          <span className="text-sm font-medium text-blue-900">{field.label}</span>
                          {field.required && (
                            <span className="text-xs text-red-600">*</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFieldFromSurvey(field.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-gray-500">
                        <Fish className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No fields added yet</p>
                        <p className="text-sm">Add fields from the left panel</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createSurvey}
                  disabled={!newSurvey.title || !newSurvey.location}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Survey</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};