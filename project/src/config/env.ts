// Import environment variables type-safely
const REQUIRED_ENV_VARS = ['VITE_HUGGING_FACE_API_KEY', 'VITE_ROBOFLOW_API_KEY'] as const;

// Validate environment variables
REQUIRED_ENV_VARS.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  huggingFaceApiKey: import.meta.env.VITE_HUGGING_FACE_API_KEY || '',
  roboflowApiKey: import.meta.env.VITE_ROBOFLOW_API_KEY || '',
  roboflowEndpoint: 'https://detect.roboflow.com/fruit-freshness/1',
  huggingFaceEndpoint: 'https://api-inference.huggingface.co/models/Qwen/Qwen2-7B-Instruct'
} as const;