import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Bell, 
  Calendar,
  MapPin,
  Award,
  FileText,
  Video,
  Plus
} from 'lucide-react';

export const StakeholderHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'projects' | 'resources'>('discussions');

  const stakeholders = [
    {
      id: 1,
      name: 'Dr. Marina Coral',
      role: 'Marine Biologist',
      organization: 'Great Barrier Reef Foundation',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 45,
      expertise: ['Coral Biology', 'Bleaching Research']
    },
    {
      id: 2,
      name: 'James Reef',
      role: 'Conservation Manager',
      organization: 'WWF Ocean Program',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 32,
      expertise: ['Marine Protected Areas', 'Policy Development']
    },
    {
      id: 3,
      name: 'Sarah Ocean',
      role: 'Data Scientist',
      organization: 'NOAA Fisheries',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 67,
      expertise: ['Climate Modeling', 'Data Analytics']
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Coral Bleaching Patterns in the Caribbean',
      author: 'Dr. Marina Coral',
      replies: 12,
      time: '2 hours ago',
      tags: ['Bleaching', 'Caribbean', 'Climate Change']
    },
    {
      id: 2,
      title: 'Best Practices for Coral Restoration',
      author: 'James Reef',
      replies: 8,
      time: '4 hours ago',
      tags: ['Restoration', 'Best Practices', 'Methodology']
    },
    {
      id: 3,
      title: 'AI Model Accuracy for Reef Health Assessment',
      author: 'Sarah Ocean',
      replies: 15,
      time: '1 day ago',
      tags: ['AI', 'Machine Learning', 'Assessment']
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Maldives Coral Restoration Initiative',
      lead: 'Dr. Marina Coral',
      participants: 8,
      progress: 75,
      deadline: '2024-06-15',
      location: 'Maldives'
    },
    {
      id: 2,
      title: 'Caribbean Reef Monitoring Network',
      lead: 'James Reef',
      participants: 12,
      progress: 45,
      deadline: '2024-08-30',
      location: 'Caribbean'
    },
    {
      id: 3,
      title: 'AI-Powered Threat Detection System',
      lead: 'Sarah Ocean',
      participants: 6,
      progress: 90,
      deadline: '2024-05-20',
      location: 'Global'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Coral Reef Health Assessment Protocol',
      type: 'document',
      author: 'Dr. Marina Coral',
      downloads: 234,
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Reef Restoration Best Practices Workshop',
      type: 'video',
      author: 'James Reef',
      views: 1547,
      duration: '45 min'
    },
    {
      id: 3,
      title: 'Climate Change Impact on Coral Reefs',
      type: 'document',
      author: 'Sarah Ocean',
      downloads: 892,
      size: '5.7 MB'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stakeholder Hub</h1>
          <p className="text-gray-600 mt-2">Collaborate with marine scientists and conservationists worldwide</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Stakeholder Profiles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder) => (
            <div key={stakeholder.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={stakeholder.avatar}
                alt={stakeholder.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{stakeholder.name}</h4>
                <p className="text-sm text-gray-600">{stakeholder.role}</p>
                <p className="text-xs text-gray-500">{stakeholder.organization}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">{stakeholder.contributions} contributions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'projects', label: 'Projects', icon: Calendar },
              { id: 'resources', label: 'Resources', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{discussion.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>By {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.time}</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                        <span>Led by {project.lead}</span>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{project.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Due: {project.deadline}</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">{project.progress}% complete</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {resource.type === 'video' ? (
                          <Video className="h-6 w-6 text-blue-600" />
                        ) : (
                          <FileText className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>By {resource.author}</span>
                          {resource.type === 'video' ? (
                            <>
                              <span>{resource.views} views</span>
                              <span>{resource.duration}</span>
                            </>
                          ) : (
                            <>
                              <span>{resource.downloads} downloads</span>
                              <span>{resource.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      {resource.type === 'video' ? 'Watch' : 'Download'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};