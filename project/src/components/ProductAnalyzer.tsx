import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { ProductAnalysis } from '../types';
import { analyzeProductImage } from '../services/api/huggingface';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ResultsTable } from './common/ResultsTable';
import { ErrorMessage } from './common/ErrorMessage';
import { APIError } from '../utils/errorUtils';

export default function ProductAnalyzer() {
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (file: File) => {
    try {
      setError(null);
      setLoading(true);
      const result = await analyzeProductImage(file);
      setAnalysis(result);
    } catch (err) {
      const message = err instanceof APIError 
        ? err.message 
        : 'Failed to analyze product image';
      setError(message);
      console.error('Error analyzing product:', err);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await handleAnalysis(acceptedFiles[0]);
      }
    }
  });

  const getResultRows = (analysis: ProductAnalysis) => [
    { label: 'Brand', value: analysis.brand },
    { label: 'Expiry Date', value: analysis.expiryDate || 'Not detected' },
    { label: 'Confidence', value: `${(analysis.confidence * 100).toFixed(2)}%` }
  ];

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Product Analysis</h2>
      
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600">Drag & drop a product image here, or click to select</p>
      </div>

      {loading && <LoadingSpinner message="Analyzing product..." />}
      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}
      {analysis && !error && (
        <ResultsTable 
          title="Analysis Results" 
          rows={getResultRows(analysis)} 
        />
      )}
    </div>
  );
}