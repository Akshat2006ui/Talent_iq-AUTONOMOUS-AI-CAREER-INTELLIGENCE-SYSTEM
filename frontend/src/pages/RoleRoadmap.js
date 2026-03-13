import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Clock, Target, Wrench, Brain, TrendingUp } from 'lucide-react';

export function RoleRoadmap() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoadmap();
  }, [role]);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch(`http://localhost:8000/role_roadmap/${encodeURIComponent(role)}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch roadmap');
      }

      const data = await res.json();
      setRoadmapData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error || 'Roadmap not found'}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 hover:text-indigo-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:text-indigo-700 flex items-center font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{roadmapData.role}</h1>
        <p className="text-lg text-gray-600">Complete roadmap and resources to become a {roadmapData.role}</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-50 rounded-lg">
          <Target className="w-5 h-5 text-indigo-600 mr-2" />
          <span className="text-indigo-700 font-medium">Experience Level: {roadmapData.experience_level}</span>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Core Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Core Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {roadmapData.requirements.core_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Advanced Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Advanced Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {roadmapData.requirements.advanced_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Wrench className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Tools & Technologies</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {roadmapData.requirements.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {roadmapData.requirements.soft_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Roadmap */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Roadmap</h2>
        <div className="space-y-6">
          {roadmapData.roadmap.map((phase, index) => (
            <div key={index} className="relative pl-8 pb-8 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                  <div className="flex items-center text-indigo-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{phase.duration}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm border border-gray-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex items-center mb-6">
          <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {roadmapData.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200 transition group"
            >
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700">{resource.name}</h4>
                <span className="text-sm text-gray-500">{resource.type}</span>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}