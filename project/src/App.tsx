import React, { useState } from 'react';
import { Scan, Apple } from 'lucide-react';
import ProductAnalyzer from './components/ProductAnalyzer';
import FreshnessAnalyzer from './components/FreshnessAnalyzer';

function App() {
  const [activeTab, setActiveTab] = useState<'products' | 'freshness'>('products');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold py-6 text-gray-900">
            Product & Freshness Analyzer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-6 py-3 rounded-lg ${
              activeTab === 'products'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            <Scan className="mr-2 h-5 w-5" />
            Product Analysis
          </button>
          <button
            onClick={() => setActiveTab('freshness')}
            className={`flex items-center px-6 py-3 rounded-lg ${
              activeTab === 'freshness'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            <Apple className="mr-2 h-5 w-5" />
            Fruit Freshness
          </button>
        </div>

        <div className="flex justify-center">
          {activeTab === 'products' ? <ProductAnalyzer /> : <FreshnessAnalyzer />}
        </div>
      </main>
    </div>
  );
}

export default App;