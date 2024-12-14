# Product & Freshness Analyzer

A modern web application that helps users analyze product information and fruit freshness using AI-powered image recognition.

![Product & Freshness Analyzer](https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=2000)

## Features

### 1. Product Analysis
- Upload product images to detect:
  - Brand name
  - Expiry date
  - Confidence score
- Powered by Hugging Face's Qwen model for accurate text extraction
- Drag-and-drop interface for easy image upload

### 2. Fruit Freshness Detection
- Analyze fruit images to determine:
  - Freshness index (0-10 scale)
  - Estimated days of freshness remaining
  - Confidence score
- Uses Roboflow's trained model for precise freshness detection
- Supports both file upload and real-time camera capture

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Upload**: React Dropzone
- **Camera Integration**: React Webcam
- **AI Services**:
  - Hugging Face API (Qwen model)
  - Roboflow API (Custom fruit freshness model)

## Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- npm or yarn
- API keys for:
  - Hugging Face
  - Roboflow

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd product-freshness-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_HUGGING_FACE_API_KEY=your_huggingface_key_here
VITE_ROBOFLOW_API_KEY=your_roboflow_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

### Product Analysis
1. Click on the "Product Analysis" tab
2. Drag and drop a product image or click to select
3. Wait for the AI to analyze the image
4. View results in the table format

### Fruit Freshness
1. Switch to the "Fruit Freshness" tab
2. Choose between:
   - Upload an image
   - Use device camera
3. Follow the prompts to capture or upload
4. Review the freshness analysis results

## Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Shared components
│   ├── ProductAnalyzer/
│   └── FreshnessAnalyzer/
├── services/            # API integration
│   └── api/
├── config/              # Configuration files
├── types/               # TypeScript types
└── utils/              # Utility functions
```

## Error Handling

The application includes comprehensive error handling:
- API connection issues
- Invalid image formats
- Missing API keys
- Failed analysis attempts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| VITE_HUGGING_FACE_API_KEY | Hugging Face API key | Yes |
| VITE_ROBOFLOW_API_KEY | Roboflow API key | Yes |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for their Qwen model
- [Roboflow](https://roboflow.com/) for fruit freshness detection
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
