import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export function SkillGapAnalysis() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [skills, setSkills] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await fetch('http://localhost:8000/roles_detailed');
      const data = await res.json();
      setRoles(data.roles);
    } catch (err) {
      console.error('Failed to fetch roles:', err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedRole || !skills) return;

    setLoading(true);
    setError('');
    setAnalysis(null);

    const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

    try {
      const res = await fetch('http://localhost:8000/skill_gap_analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: skillsList,
          target_role: selectedRole
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to analyze skill gap');
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-amber-600';
    if (score >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Skill Gap Analysis</h1>
        <p className="text-gray-600">
          Analyze your skills against target role requirements and get personalized recommendations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a role...</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills (comma-separated)
            </label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., python, javascript, react, sql, docker"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
          </button>
        </form>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Overall Readiness */}
          <div className={`rounded-xl p-8 border-2 ${getReadinessColor(analysis.overall_readiness)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Target className="w-8 h-8 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Overall Readiness</h2>
                  <p className="text-sm opacity-75">For {analysis.target_role}</p>
                </div>
              </div>
              <div className="text-5xl font-bold">{analysis.overall_readiness}%</div>
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-4">
              <div 
                className={`bg-gradient-to-r ${getProgressColor(analysis.overall_readiness)} h-4 rounded-full transition-all duration-1000`}
                style={{width: `${analysis.overall_readiness}%`}}
              ></div>
            </div>
          </div>

          {/* Core Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Core Skills</h3>
              <span className="text-2xl font-bold text-indigo-600">{analysis.core_skills.score}%</span>
            </div>
            
            {analysis.core_skills.has.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-green-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Skills You Have
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.core_skills.has.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.core_skills.missing.length > 0 && (
              <div>
                <p className="text-sm font-medium text-red-700 mb-2 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  Skills to Learn
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.core_skills.missing.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Advanced Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Advanced Skills</h3>
              <span className="text-2xl font-bold text-purple-600">{analysis.advanced_skills.score}%</span>
            </div>
            
            {analysis.advanced_skills.has.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-green-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Skills You Have
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.advanced_skills.has.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.advanced_skills.missing.length > 0 && (
              <div>
                <p className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Skills to Master
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.advanced_skills.missing.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Tools & Technologies</h3>
              <span className="text-2xl font-bold text-blue-600">{analysis.tools.score}%</span>
            </div>
            
            {analysis.tools.has.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-green-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Tools You Know
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.tools.has.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.tools.missing.length > 0 && (
              <div>
                <p className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Tools to Learn
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.tools.missing.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  1
                </div>
                <p className="text-gray-700">Focus on mastering the missing core skills first - they are essential for the role</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  2
                </div>
                <p className="text-gray-700">Build projects that demonstrate your skills in real-world scenarios</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  3
                </div>
                <p className="text-gray-700">Develop soft skills: {analysis.soft_skills.join(', ')}</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  4
                </div>
                <p className="text-gray-700">Target experience level: {analysis.experience_level}</p>
              </div>
            </div>
            
            <button
              onClick={() => window.location.href = `/roadmap/${encodeURIComponent(analysis.target_role)}`}
              className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View Detailed Roadmap for {analysis.target_role}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
