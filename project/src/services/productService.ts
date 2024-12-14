import { HfInference } from '@huggingface/inference';
import { ProductAnalysis } from '../types';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function analyzeProduct(file: File): Promise<ProductAnalysis> {
  try {
    // Convert file to base64
    const reader = new FileReader();
    const base64String = await new Promise<string>((resolve) => {
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    });

    // Use Qwen-VL model for image analysis
    const response = await hf.imageToText({
      model: 'Qwen/Qwen-VL-Chat',
      inputs: {
        image: base64String,
        text: "Analyze this product image and extract: 1. Brand name 2. Expiry date (if visible)"
      }
    });

    // Parse the response and extract information
    // Note: This is a simplified example. You'll need to adjust the parsing based on the actual API response
    return {
      brand: "Sample Brand", // Replace with actual parsing
      expiryDate: "2024-12-31", // Replace with actual parsing
      confidence: 0.95
    };
  } catch (error) {
    console.error('Error analyzing product:', error);
    throw error;
  }
}