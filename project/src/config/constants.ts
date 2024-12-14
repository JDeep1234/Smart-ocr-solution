// API Configuration
export const API_CONFIG = {
  HUGGING_FACE: {
    MODEL_ID: 'Qwen/Qwen2-7B-Instruct',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7
  },
  ROBOFLOW: {
    MODEL_VERSION: '1',
    CONFIDENCE_THRESHOLD: 0.5
  }
} as const;