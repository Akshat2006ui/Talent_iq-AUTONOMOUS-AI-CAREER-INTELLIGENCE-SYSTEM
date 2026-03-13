import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CareerPredictor } from './pages/CareerPredictor';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { Roles } from './pages/Roles';
import { RoleRoadmap } from './pages/RoleRoadmap';
import { SkillGapAnalysis } from './pages/SkillGapAnalysis';
import { About } from './pages/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/predict" element={<ProtectedRoute><CareerPredictor /></ProtectedRoute>} />
            <Route path="/analyze" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roadmap/:role" element={<RoleRoadmap />} />
            <Route path="/skill-gap" element={<ProtectedRoute><SkillGapAnalysis /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default App;
