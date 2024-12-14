import { API_CONFIG } from '../../config/constants';
import { base64ToBlob } from '../../utils/imageUtils';
import { FreshnessAnalysis } from '../../types';
import { APIError } from '../../utils/errorUtils';

interface RoboflowPrediction {
  class: string;
  confidence: number;
  freshness_score?: number;
}

function calculateFreshnessMetrics(predictions: RoboflowPrediction[]): FreshnessAnalysis {
  const validPredictions = predictions.filter(
    p => p.confidence >= API_CONFIG.ROBOFLOW.CONFIDENCE_THRESHOLD
  );
  
  if (validPredictions.length === 0) {
    throw new APIError('No valid predictions found');
  }

  const avgConfidence = validPredictions.reduce((sum, p) => sum + p.confidence, 0) / validPredictions.length;
  const freshnessIndex = Math.min(10, avgConfidence * 10);
  const estimatedDays = Math.round(freshnessIndex * 1.2);

  return {
    freshnessIndex,
    estimatedDays,
    confidence: avgConfidence
  };
}

export async function analyzeFruitImage(file: File | string): Promise<FreshnessAnalysis> {
  if (!import.meta.env.VITE_ROBOFLOW_API_KEY) {
    throw new APIError('Roboflow API key is not configured');
  }

  try {
    const formData = new FormData();
    const blob = typeof file === 'string' ? await base64ToBlob(file) : file;
    formData.append('image', blob);

    const response = await fetch(
      `https://detect.roboflow.com/fruit-freshness/${API_CONFIG.ROBOFLOW.MODEL_VERSION}`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `API-Key ${import.meta.env.VITE_ROBOFLOW_API_KEY}`
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new APIError('API request failed', response.status);
    }

    const data = await response.json();
    return calculateFreshnessMetrics(data.predictions);
  } catch (error) {
    console.error('Error in Roboflow API:', error);
    throw error instanceof APIError ? error : new APIError('Failed to analyze fruit freshness');
  }
}