import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Unlock Your Career Potential
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            AI-powered career prediction and resume analysis platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Get Started
            </Link>
            <Link
              to="/roles"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Explore Roles
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How TalentIQ Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you discover the perfect career path based on your skills and experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resume Analysis</h3>
              <p className="text-gray-600">
                Upload your resume and get instant analysis with skill extraction and career recommendations
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Career Prediction</h3>
              <p className="text-gray-600">
                Get AI-powered career recommendations based on your skills and experience
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Skill Matching</h3>
              <p className="text-gray-600">
                We match your skills with the most suitable career paths using advanced algorithms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to discover your career path?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of users who have found their perfect career match with TalentIQ
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
