import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, BarChart2, ArrowRight } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! What would you like to do today?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link
          to="/predict"
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Predict Career</h3>
          <p className="text-gray-600">
            Get AI-powered career recommendations based on your skills and experience
          </p>
        </Link>

        <Link
          to="/analyze"
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyze Resume</h3>
          <p className="text-gray-600">
            Upload your resume and get instant analysis with skill extraction
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Explore Career Roles</h2>
        <p className="text-indigo-700 mb-6">
          Browse all available career paths and learn about different roles in the industry
        </p>
        <Link
          to="/roles"
          className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          <Briefcase className="mr-2 w-5 h-5" />
          View All Roles
        </Link>
      </div>
    </div>
  );
}
