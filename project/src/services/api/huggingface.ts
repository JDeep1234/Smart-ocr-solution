import { config } from '../../config/env';
import { API_CONFIG } from '../../config/constants';
import { fileToBase64 } from '../../utils/imageUtils';
import { ProductAnalysis } from '../../types';
import { APIError } from '../../utils/errorUtils';

export async function analyzeProductImage(file: File): Promise<ProductAnalysis> {
  if (!import.meta.env.VITE_HUGGING_FACE_API_KEY) {
    throw new APIError('Hugging Face API key is not configured');
  }

  try {
    const base64String = await fileToBase64(file);
    
    const response = await fetch('https://api-inference.huggingface.co/models/' + API_CONFIG.HUGGING_FACE.MODEL_ID, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          image: base64String,
          text: "Analyze this product image and extract: 1. Brand name 2. Expiry date (if visible). Respond in JSON format only."
        },
        parameters: {
          max_tokens: API_CONFIG.HUGGING_FACE.MAX_TOKENS,
          temperature: API_CONFIG.HUGGING_FACE.TEMPERATURE
        }
      })
    });

    if (!response.ok) {
      throw new APIError('API request failed', response.status);
    }

    const data = await response.json();
    
    try {
      const parsedResult = typeof data === 'string' ? JSON.parse(data) : data;
      return {
        brand: parsedResult.brand || 'Unknown',
        expiryDate: parsedResult.expiryDate || null,
        confidence: parsedResult.confidence || 0.5
      };
    } catch (parseError) {
      throw new APIError('Failed to parse API response');
    }
  } catch (error) {
    console.error('Error in Hugging Face API:', error);
    throw error instanceof APIError ? error : new APIError('Failed to analyze product image');
  }
}