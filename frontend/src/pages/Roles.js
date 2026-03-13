import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle, ArrowRight, BookOpen, Target } from 'lucide-react';

export function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };

  const roleInfo = {
    'Data Scientist': {
      description: 'Analyze complex data to help companies make better decisions',
      skills: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis'],
      level: 'Mid to Senior',
      color: 'indigo'
    },
    'Data Analyst': {
      description: 'Transform data into insights through analysis and visualization',
      skills: ['SQL', 'Excel', 'Tableau', 'Data Visualization'],
      level: 'Entry to Mid',
      color: 'blue'
    },
    'Backend Developer': {
      description: 'Build and maintain server-side application logic and databases',
      skills: ['Python/Java/Node.js', 'SQL', 'REST APIs', 'Microservices'],
      level: 'Entry to Senior',
      color: 'green'
    },
    'Frontend Developer': {
      description: 'Create engaging user interfaces and web experiences',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Responsive Design'],
      level: 'Entry to Senior',
      color: 'purple'
    },
    'AI Engineer': {
      description: 'Develop intelligent systems using machine learning and AI',
      skills: ['Python', 'TensorFlow', 'Deep Learning', 'Neural Networks'],
      level: 'Mid to Senior',
      color: 'pink'
    },
    'DevOps Engineer': {
      description: 'Automate and optimize software development and deployment',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      level: 'Mid to Senior',
      color: 'orange'
    },
    'Full Stack Developer': {
      description: 'Work on both frontend and backend of web applications',
      skills: ['JavaScript', 'React', 'Node.js', 'Databases'],
      level: 'Mid to Senior',
      color: 'teal'
    },
    'Android Developer': {
      description: 'Build native Android mobile applications',
      skills: ['Kotlin', 'Android Studio', 'Mobile Development', 'Firebase'],
      level: 'Entry to Senior',
      color: 'green'
    },
    'Mobile Developer': {
      description: 'Create cross-platform mobile applications',
      skills: ['Flutter', 'React Native', 'Mobile UI', 'APIs'],
      level: 'Entry to Senior',
      color: 'blue'
    },
    'iOS Developer': {
      description: 'Develop native iOS applications for Apple devices',
      skills: ['Swift', 'UIKit', 'Xcode', 'iOS SDK'],
      level: 'Entry to Senior',
      color: 'gray'
    },
    'QA Engineer': {
      description: 'Ensure software quality through testing and automation',
      skills: ['Testing', 'Selenium', 'Automation', 'Quality Assurance'],
      level: 'Entry to Mid',
      color: 'yellow'
    },
    'UI/UX Designer': {
      description: 'Design intuitive and beautiful user experiences',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      level: 'Entry to Senior',
      color: 'pink'
    },
    'DotNet Developer': {
      description: 'Build enterprise applications using Microsoft technologies',
      skills: ['C#', 'ASP.NET', 'SQL Server', 'Entity Framework'],
      level: 'Entry to Senior',
      color: 'purple'
    },
    'PHP Developer': {
      description: 'Develop web applications using PHP and frameworks',
      skills: ['PHP', 'Laravel', 'MySQL', 'Backend Development'],
      level: 'Entry to Mid',
      color: 'indigo'
    },
    'Ruby Developer': {
      description: 'Create web applications with Ruby on Rails',
      skills: ['Ruby', 'Rails', 'PostgreSQL', 'MVC'],
      level: 'Entry to Mid',
      color: 'red'
    },
    'Systems Programmer': {
      description: 'Develop low-level system software and optimize performance',
      skills: ['Rust', 'C++', 'Systems Programming', 'Performance'],
      level: 'Senior',
      color: 'gray'
    },
    'Embedded Developer': {
      description: 'Program embedded systems and IoT devices',
      skills: ['Embedded C', 'Microcontrollers', 'IoT', 'Hardware'],
      level: 'Mid to Senior',
      color: 'orange'
    },
    'Blockchain Developer': {
      description: 'Build decentralized applications and smart contracts',
      skills: ['Blockchain', 'Ethereum', 'Solidity', 'Web3'],
      level: 'Mid to Senior',
      color: 'yellow'
    },
    'Security Engineer': {
      description: 'Protect systems and networks from cyber threats',
      skills: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Ethical Hacking'],
      level: 'Mid to Senior',
      color: 'red'
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-50 border-indigo-200',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-50 border-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-50 border-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-50 border-purple-200',
      pink: 'bg-pink-100 text-pink-600 hover:bg-pink-50 border-pink-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-50 border-orange-200',
      teal: 'bg-teal-100 text-teal-600 hover:bg-teal-50 border-teal-200',
      yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-50 border-yellow-200',
      red: 'bg-red-100 text-red-600 hover:bg-red-50 border-red-200',
      gray: 'bg-gray-100 text-gray-600 hover:bg-gray-50 border-gray-200'
    };
    return colors[color] || colors.indigo;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Career Roles</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover detailed roadmaps, required skills, and learning resources for each career path
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => {
          const info = roleInfo[role] || {
            description: 'Explore this exciting career path',
            skills: ['Various Skills'],
            level: 'All Levels',
            color: 'indigo'
          };
          
          return (
            <div 
              key={index} 
              onClick={() => navigate(`/roadmap/${encodeURIComponent(role)}`)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${getColorClasses(info.color)} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                {role}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {info.description}
              </p>

              <div className="flex items-center text-xs text-gray-500 mb-4">
                <Target className="w-3 h-3 mr-1" />
                <span>{info.level}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                {info.skills.slice(0, 3).map((skill, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-indigo-600 font-medium">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>View Roadmap</span>
                </div>
                <span className="text-xs text-gray-400">Click to explore</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Path to Choose?</h2>
          <p className="text-gray-600 mb-6">
            Use our AI-powered tools to find the perfect career match based on your skills
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/predict')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Predict My Career
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 border-2 border-indigo-600 transition"
            >
              Analyze My Resume
            </button>
            <button
              onClick={() => navigate('/skill-gap')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Check Skill Gap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
