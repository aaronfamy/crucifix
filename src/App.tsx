import React, { useState, useEffect } from 'react';
import { Upload, FileText, Zap, AlertCircle, Briefcase, MapPin, DollarSign, Sparkles } from 'lucide-react';

// TypeScript interfaces
interface JobMatch {
  id: string;
  title: string;
  company: string;
  matchPercentage: number;
  description: string;
  location: string;
  salary: string;
  type: string;
  requirements: string[];
}

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

interface JobCardProps {
  job: JobMatch;
  index: number;
}

interface ResultsSectionProps {
  jobs: JobMatch[];
}

// LoadingSpinner Component
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-2 border-gray-600 border-t-orange-500 rounded-full animate-spin`}></div>
    </div>
  );
};

// ErrorMessage Component
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6 animate-in fade-in duration-300">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-300 text-sm leading-relaxed">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// JobCard Component
const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-orange-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-400';
    if (score >= 80) return 'bg-orange-400';
    if (score >= 70) return 'bg-yellow-400';
    return 'bg-gray-400';
  };

  return (
    <div 
      className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 animate-in slide-in-from-bottom duration-500"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 hover:text-orange-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-orange-400 font-semibold mb-2">{job.company}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        
        {/* Match Score */}
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(job.matchPercentage)} mb-1`}>
            {job.matchPercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            Match Score
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {job.description}
      </p>

      {/* Requirements */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Requirements:</h4>
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 6).map((req, reqIndex) => (
            <span
              key={reqIndex}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700"
            >
              {req}
            </span>
          ))}
          {job.requirements.length > 6 && (
            <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs border border-gray-700">
              +{job.requirements.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getScoreBgColor(job.matchPercentage)} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${job.matchPercentage}%` }}
          />
        </div>
        <button className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};

// ResultsSection Component
const ResultsSection: React.FC<ResultsSectionProps> = ({ jobs }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">
          🎯 Perfect Matches Found!
        </h2>
        <p className="text-gray-400">
          We found {jobs.length} jobs that match your skills and experience
        </p>
      </div>
      
      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>
      
      <div className="flex justify-center pt-6">
        <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
          View All Matches
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  // State management
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isImproving, setIsImproving] = useState<boolean>(false);
  const [improvedResume, setImprovedResume] = useState<string | null>(null);

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setSelectedFile(droppedFile);
        setError(null);
      } else {
        setError('Please upload a PDF file only.');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please upload a PDF file only.');
      }
    }
  };

  // API call to analyze resume
  const analyzeResume = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJobMatches([]);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setJobMatches(data.matches || []);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please check your connection and try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // API call to improve resume using GPT
  const improveResume = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsImproving(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await fetch('http://localhost:5000/improve_resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setImprovedResume(data.improved_text || '');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to improve resume. Please check your connection and try again.');
      console.error('Resume improvement error:', err);
    } finally {
      setIsImproving(false);
    }
  };

  // Clear error when user interacts
  const clearError = () => {
    setError(null);
  };

  // Reset to initial state
  const resetApp = () => {
    setSelectedFile(null);
    setJobMatches([]);
    setError(null);
    setIsLoading(false);
    setIsImproving(false);
    setImprovedResume(null);
  };

  // Effect to clear results when file changes
  useEffect(() => {
    if (selectedFile) {
      setJobMatches([]);
      setImprovedResume(null);
    }
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  AI Resume Matcher
                </h1>
                <p className="text-xs text-gray-400">Powered by Advanced AI</p>
              </div>
            </div>
            {(selectedFile || jobMatches.length > 0) && (
              <button
                onClick={resetApp}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onDismiss={clearError} />
        )}

        {/* Loading State */}
        {(isLoading || isImproving) && (
          <div className="text-center space-y-4">
            <LoadingSpinner size="large" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {isLoading ? 'Analyzing Your Resume...' : 'Improving Your Resume...'}
              </h3>
              <p className="text-gray-400">
                {isLoading 
                  ? 'Our AI is extracting skills and matching you with the perfect opportunities'
                  : 'GPT is enhancing your resume with professional improvements'
                }
              </p>
            </div>
          </div>
        )}

        {/* Improved Resume Display */}
        {!isLoading && !isImproving && improvedResume && (
          <div className="mb-8 bg-gray-900/50 border border-gray-800 rounded-xl p-6 animate-in fade-in duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">✨ Improved Resume</h3>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {improvedResume}
              </pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors">
                Download Improved Resume
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && !isImproving && jobMatches.length > 0 && (
          <ResultsSection jobs={jobMatches} />
        )}

        {/* Upload Section - Show when no results */}
        {!isLoading && !isImproving && jobMatches.length === 0 && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Find Your Perfect{' '}
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Career Match
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Upload your resume and let our AI analyze it against thousands of job opportunities 
                to find your ideal career match with precision scoring.
              </p>
            </div>

            {/* File Upload Section */}
            <div className="max-w-2xl mx-auto">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-orange-500 bg-orange-500/5 scale-105' 
                    : selectedFile 
                      ? 'border-orange-400 bg-orange-400/5' 
                      : 'border-gray-700 hover:border-gray-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-orange-400/20 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-orange-400">{selectedFile.name}</p>
                        <p className="text-sm text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">Drop your resume here</p>
                        <p className="text-gray-400">or click to browse files</p>
                        <p className="text-sm text-gray-500 mt-2">PDF files only, max 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedFile && (
                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={analyzeResume}
                    disabled={isLoading || isImproving}
                    className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Find Matching Jobs</span>
                  </button>
                  
                  <button
                    onClick={improveResume}
                    disabled={isLoading || isImproving}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>✨ Improve My Resume</span>
                  </button>
                </div>
              )}
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center space-y-3 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white">AI-Powered Analysis</h3>
                <p className="text-sm text-gray-400">Advanced NLP extracts skills and experience from your resume</p>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white">Smart Job Matching</h3>
                <p className="text-sm text-gray-400">Cosine similarity algorithm finds your perfect career matches</p>
              </div>
              
              <div className="text-center space-y-3 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white">GPT Resume Enhancement</h3>
                <p className="text-sm text-gray-400">AI-powered suggestions to improve your resume's impact</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AI Resume Matcher. Powered by your custom trained models.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;