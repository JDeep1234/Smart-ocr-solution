import React, { useState, useCallback } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import { FreshnessAnalysis } from '../types';
import { analyzeFruitImage } from '../services/api/roboflow';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ResultsTable } from './common/ResultsTable';

export default function FreshnessAnalyzer() {
  const [analysis, setAnalysis] = useState<FreshnessAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const handleImageAnalysis = async (file: File | string) => {
    try {
      setLoading(true);
      const result = await analyzeFruitImage(file);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing freshness:', error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: async (acceptedFiles) => {
      await handleImageAnalysis(acceptedFiles[0]);
    }
  });

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      handleImageAnalysis(imageSrc);
    }
  }, []);

  const getResultRows = (analysis: FreshnessAnalysis) => [
    { label: 'Freshness Index', value: `${analysis.freshnessIndex.toFixed(2)}/10` },
    { label: 'Estimated Days Left', value: `${analysis.estimatedDays} days` },
    { label: 'Confidence', value: `${(analysis.confidence * 100).toFixed(2)}%` }
  ];

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Fruit Freshness Analysis</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setUseCamera(false)}
          className={`flex-1 py-2 px-4 rounded ${!useCamera ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Upload Image
        </button>
        <button
          onClick={() => setUseCamera(true)}
          className={`flex-1 py-2 px-4 rounded ${useCamera ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Use Camera
        </button>
      </div>

      {useCamera ? (
        <div className="text-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mx-auto rounded-lg mb-4"
          />
          <button
            onClick={captureImage}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            <Camera className="inline-block mr-2 h-5 w-5" />
            Capture and Analyze
          </button>
        </div>
      ) : (
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Drag & drop a fruit image here, or click to select</p>
        </div>
      )}

      {loading && <LoadingSpinner message="Analyzing freshness..." />}

      {analysis && (
        <ResultsTable 
          title="Freshness Analysis Results" 
          rows={getResultRows(analysis)} 
        />
      )}
    </div>
  );
}