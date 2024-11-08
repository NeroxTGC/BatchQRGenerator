import React from 'react';
import { Star, Copy } from 'lucide-react';
import { QRSettings } from '../../types';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  settings: QRSettings;
  stars: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Modern Business',
    description: 'Clean and professional design with rounded corners',
    preview: 'https://example.com/preview1.png',
    stars: 245,
    settings: {
      size: 200,
      errorCorrection: 'H',
      style: {
        foreground: '#1a1a1a',
        background: '#ffffff',
        pattern: 'square'
      }
    }
  },
  {
    id: '2',
    name: 'Neon Glow',
    description: 'Eye-catching design with vibrant colors',
    preview: 'https://example.com/preview2.png',
    stars: 189,
    settings: {
      size: 200,
      errorCorrection: 'H',
      style: {
        foreground: '#00ff88',
        background: '#000000',
        pattern: 'circle'
      }
    }
  }
];

interface Props {
  onSelectTemplate: (settings: QRSettings) => void;
}

export default function TemplateGallery({ onSelectTemplate }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div key={template.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            {/* Preview would go here */}
            <div className="w-32 h-32 bg-gray-200 rounded" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {template.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            {template.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              {template.stars}
            </div>
            
            <button
              onClick={() => onSelectTemplate(template.settings)}
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <Copy className="w-4 h-4 mr-1" />
              Use Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}