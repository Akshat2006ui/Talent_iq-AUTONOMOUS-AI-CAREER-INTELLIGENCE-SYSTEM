import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, ArrowRight, Loader } from 'lucide-react';

export function CareerPredictor() {
  const [skills, setSkills] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
      
      const res = await fetch('http://localhost:8000/predict_career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: skillsArray }),
      });

      if (!res.ok) {
        throw new Error('Failed to predict career');
      }

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Predictor</h1>
        <p className="text-gray-600">
          Enter your skills separated by commas to get career recommendations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills
            </label>
            <textarea
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 border"
              placeholder="python, javascript, react, nodejs, sql..."
              rows="4"
            />
            <p className="mt-2 text-sm text-gray-500">
              Enter skills separated by commas
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : (
              <>
                Predict Career
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {prediction && prediction.predictions && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Career Predictions</h3>
            {prediction.predictions.map((pred, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 transition cursor-pointer"
                onClick={() => navigate(`/roadmap/${encodeURIComponent(pred.role)}`)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-sm text-gray-500">#{index + 1} Match</span>
                    <h4 className="text-xl font-bold text-gray-900">{pred.role}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-indigo-600">{pred.match_percentage}%</div>
                    <div className="text-xs text-gray-500">Confidence</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{width: `${pred.match_percentage}%`}}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Click to view detailed roadmap and resources
                </p>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Want to see how ready you are for a specific role? Try our{' '}
                <button
                  onClick={() => navigate('/skill-gap')}
                  className="font-semibold underline hover:text-blue-900"
                >
                  Skill Gap Analysis
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
