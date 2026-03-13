import React, { useState } from 'react';
import { FileText, Upload, ArrowRight, Loader } from 'lucide-react';

export function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && 
          selectedFile.name.toLowerCase().split('.').pop() !== 'pdf' &&
          selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
          selectedFile.name.toLowerCase().split('.').pop() !== 'docx') {
        setError('Please upload a PDF or DOCX file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setAnalysis(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/analyze_resume', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to analyze resume');
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the resume');
      console.error('Resume analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Analyzer</h1>
        <p className="text-gray-600">
          Upload your resume to get instant analysis and career recommendations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF or DOCX)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOCX up to 10MB
                </p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {analysis && (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-green-900">
                  Resume Analysis Results
                </h3>
                {analysis.ai_powered && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ✨ AI Powered
                  </span>
                )}
              </div>
              
              {analysis.name && (
                <div className="mb-3">
                  <span className="text-sm text-green-700">Name:</span>
                  <p className="font-medium text-green-900">{analysis.name}</p>
                </div>
              )}
              
              {analysis.email && (
                <div className="mb-3">
                  <span className="text-sm text-green-700">Email:</span>
                  <p className="font-medium text-green-900">{analysis.email}</p>
                </div>
              )}
              
              {analysis.phone && (
                <div className="mb-3">
                  <span className="text-sm text-green-700">Phone:</span>
                  <p className="font-medium text-green-900">{analysis.phone}</p>
                </div>
              )}

              {analysis.experience_level && (
                <div className="mb-3">
                  <span className="text-sm text-green-700">Experience Level:</span>
                  <p className="font-medium text-green-900">{analysis.experience_level}</p>
                </div>
              )}

              {analysis.skills && analysis.skills.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-green-700">Extracted Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.predictions && analysis.predictions.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-green-700 font-medium">Career Predictions:</span>
                  <div className="mt-3 space-y-3">
                    {analysis.predictions.slice(0, 5).map((pred, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-green-200 hover:shadow-md transition cursor-pointer"
                           onClick={() => window.location.href = `/roadmap/${encodeURIComponent(pred.role)}`}>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-lg font-bold text-green-700">{pred.role}</p>
                          <span className="text-2xl font-bold text-indigo-600">{pred.match_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                            style={{width: `${pred.match_percentage}%`}}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Click to view roadmap and resources</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.strengths && (
                <div className="mb-4 bg-white rounded-lg p-4 border border-green-200">
                  <span className="text-sm font-medium text-green-700">Strengths:</span>
                  <p className="mt-1 text-gray-700">{analysis.strengths}</p>
                </div>
              )}

              {analysis.suggestions && (
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <span className="text-sm font-medium text-green-700">Career Growth Suggestions:</span>
                  <p className="mt-1 text-gray-700">{analysis.suggestions}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
