import React from 'react';
import { Brain, Target, Zap, Award, Github, Linkedin, Mail, Code, Sparkles } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">About TalentIQ</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              AI-Powered Career Guidance Platform helping professionals make informed career decisions
            </p>
          </div>
        </div>
      </div>

      {/* About Platform */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What is TalentIQ?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TalentIQ is an innovative AI-powered platform that combines machine learning, 
            natural language processing, and expert career guidance to help you navigate your professional journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 text-sm">
              Advanced machine learning algorithms analyze your skills and predict the best career matches
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
            <p className="text-gray-600 text-sm">
              Identify exactly what skills you need to develop for your target role
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Roadmaps</h3>
            <p className="text-gray-600 text-sm">
              Step-by-step learning paths with curated resources for 15+ career roles
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Analysis</h3>
            <p className="text-gray-600 text-sm">
              Upload your resume and get instant AI-powered insights and recommendations
            </p>
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-12 border border-indigo-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Developer</h2>
            <p className="text-lg text-gray-600">
              Built with passion and expertise in AI & Full-Stack Development
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                {/* Developer Image */}
                <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <img 
                        src="/developer-photo.jpg" 
                        alt="Akshat Kapoor" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          if (!parent.querySelector('.fallback-initials')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-initials text-white text-6xl font-bold';
                            fallback.textContent = 'AK';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <a href="https://github.com/Akshat2006ui" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200 transition">
                        <Github className="w-6 h-6" />
                      </a>
                      <a href="https://www.linkedin.com/in/akshat-kapoor-368a0b275" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200 transition">
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a href="mailto:akshatkapoor640@gmail.com" className="text-white hover:text-indigo-200 transition">
                        <Mail className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="md:w-2/3 p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Akshat Kapoor</h3>
                  <p className="text-indigo-600 font-semibold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Expert & Full-Stack Developer
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Akshat Kapoor is a passionate AI expert and full-stack developer with deep expertise in 
                    artificial intelligence, machine learning, and modern web technologies. With a vision to 
                    democratize career guidance through AI, he created TalentIQ to help professionals make 
                    data-driven career decisions.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Technical Expertise</h4>
                        <p className="text-sm text-gray-600">
                          Python, JavaScript, React, FastAPI, Machine Learning, Deep Learning, 
                          Natural Language Processing, Google Gemini AI, TensorFlow, PyTorch
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Brain className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">AI Specialization</h4>
                        <p className="text-sm text-gray-600">
                          Expert in building intelligent systems using cutting-edge AI technologies. 
                          Specialized in NLP, computer vision, and predictive analytics for real-world applications.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Target className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Mission</h4>
                        <p className="text-sm text-gray-600">
                          Empowering individuals to make informed career decisions through AI-powered insights 
                          and personalized guidance, making career planning accessible to everyone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                          <a href="mailto:akshatkapoor640@gmail.com" className="hover:text-indigo-600">
                            akshatkapoor640@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href="tel:+918699845663" className="hover:text-indigo-600">
                            +91 8699845663
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Github className="w-4 h-4 mr-2 text-indigo-600" />
                          <a href="https://github.com/Akshat2006ui" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                            github.com/Akshat2006ui
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Linkedin className="w-4 h-4 mr-2 text-indigo-600" />
                          <a href="https://www.linkedin.com/in/akshat-kapoor-368a0b275" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                            LinkedIn Profile
                          </a>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "Technology should empower people to achieve their dreams. TalentIQ is my contribution 
                      to making career guidance intelligent, accessible, and personalized for everyone."
                    </p>
                    <p className="text-sm text-gray-900 font-semibold mt-2">- Akshat Kapoor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Built With Modern Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React.js</li>
                <li>• Tailwind CSS</li>
                <li>• React Router</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• FastAPI (Python)</li>
                <li>• SQLAlchemy</li>
                <li>• SQLite</li>
                <li>• JWT Authentication</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI & ML</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Gemini AI</li>
                <li>• Scikit-learn</li>
                <li>• TensorFlow</li>
                <li>• NLP Processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals using TalentIQ to make smarter career decisions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Get Started Free
            </a>
            <a
              href="/roles"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition border-2 border-white"
            >
              Explore Career Roles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
