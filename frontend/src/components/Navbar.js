import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Briefcase, FileText, Home, BarChart2 } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">TalentIQ</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/roles" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Career Roles
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              {user && (
                <>
                  <Link to="/predict" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Predict Career
                  </Link>
                  <Link to="/analyze" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Analyze Resume
                  </Link>
                  <Link to="/skill-gap" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Skill Gap
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="text-gray-500 w-5 h-5" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
