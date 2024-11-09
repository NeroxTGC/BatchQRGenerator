import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Save } from 'lucide-react';
import ColorPicker from './common/ColorPicker';
import { QRData, QRProject } from '../types';
import SelectProjectModal from './projects/SelectProjectModal';
import { colorPresets, gradientPresets } from '../constants/colorPresets';
  

interface Props {
  onSaveToProject: (project: QRProject) => void;
  projects: QRProject[];
  onAddToExistingProject: (projectId: string, qrData: QRData) => void;
}

const QuickGeneratePage = ({ onSaveToProject, projects, onAddToExistingProject }: Props) => {
  const [qrValue, setQrValue] = useState('');
  const [size, setSize] = useState(200);
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);
  const [isGradient, setIsGradient] = useState(false);
  const [gradientStyle, setGradientStyle] = useState('');

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveToProject = () => {
    setIsSelectProjectModalOpen(true);
  };

  const handleAddToProject = (projectId: string) => {
    const qrData = {
      id: crypto.randomUUID(),
      content: qrValue || 'https://example.com',
      label: 'Quick Generated QR'
    };
    onAddToExistingProject(projectId, qrData);
    setIsSelectProjectModalOpen(false);
  };

  const QRPreview = () => (
    <div className="relative">
      <QRCodeCanvas
        value={qrValue || 'https://example.com'}
        size={size}
        level="H"
        fgColor={foreground}
        bgColor={background}
      />
      {isGradient && (
        <div 
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{ background: gradientStyle }}
        />
      )}
    </div>
  );

  const handleGradientPresetClick = (preset: typeof gradientPresets[0]) => {
    setForeground(preset.foreground);
    setBackground(preset.background);
    setIsGradient(true);
    setGradientStyle(preset.foregroundGradient);
  };

  return (
    <div className="max-w-4xl mx-auto pt-32">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick QR Code Generator</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <input
                type="text"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter URL or text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="400"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                label="Foreground Color"
                value={foreground}
                onChange={setForeground}
              />
              <ColorPicker
                label="Background Color"
                value={background}
                onChange={setBackground}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color Presets
              </label>
              <div className="grid grid-cols-5 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setForeground(preset.foreground);
                      setBackground(preset.background);
                    }}
                    className="group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    title={preset.description}
                  >
                    <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden border border-gray-200">
                      <div 
                        className="h-1/2 w-full" 
                        style={{ backgroundColor: preset.background }}
                      />
                      <div 
                        className="h-1/2 w-full" 
                        style={{ backgroundColor: preset.foreground }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center block">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">
                Gradient Presets
              </label>
              <div className="grid grid-cols-5 gap-3">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleGradientPresetClick(preset)}
                    className="group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    title={preset.description}
                  >
                    <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden border border-gray-200">
                      <div 
                        className="h-1/2 w-full" 
                        style={{ background: preset.background }}
                      />
                      <div 
                        className="h-1/2 w-full" 
                        style={{ background: preset.foregroundGradient }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center block">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-8 rounded-xl flex items-center justify-center mb-6">
              <QRPreview />
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleDownload}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </button>
              <button 
                onClick={handleSaveToProject}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save to Project
              </button>
            </div>
          </div>
        </div>
      </div>
      <SelectProjectModal
        isOpen={isSelectProjectModalOpen}
        onClose={() => setIsSelectProjectModalOpen(false)}
        projects={projects}
        onSelect={handleAddToProject}
      />
    </div>
  );
};

export { QuickGeneratePage };