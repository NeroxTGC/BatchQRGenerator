import React, { useState } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Save, FileImage, FileCode } from 'lucide-react';
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
  const [fileName, setFileName] = useState('qr');

  const handleDownloadPNG = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${fileName || 'qr'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `${fileName || 'qr'}-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(svgUrl);
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
    <div className="relative qr-preview">
      <div className="relative">
        <QRCodeCanvas
          value={qrValue || 'https://example.com'}
          size={size}
          level="H"
          fgColor={foreground}
          bgColor={background}
        />
        <div className="absolute top-0 left-0 opacity-0 pointer-events-none">
          <QRCodeSVG
            id="qr-svg"
            value={qrValue || 'https://example.com'}
            size={size}
            level="H"
            fgColor={foreground}
            bgColor={background}
          />
        </div>
      </div>
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 lg:pt-32">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 lg:mb-8">Quick QR Code Generator</h2>
        
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 lg:mb-3">
                Content
              </label>
              <input
                type="text"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                          focus:border-indigo-500 dark:focus:border-indigo-400"
                placeholder="Enter URL or text"
              />
            </div>

            <div className="lg:py-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 lg:mb-3">
                Size: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="420"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-indigo-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 lg:py-2">
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

            <div className="lg:py-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 lg:mb-4">
                Color Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setForeground(preset.foreground);
                      setBackground(preset.background);
                    }}
                    className="group p-2 lg:p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                             border border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
                    title={preset.description}
                  >
                    <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden 
                                border-2 border-gray-200 dark:border-gray-600 shadow-sm">
                      <div 
                        className="h-1/2 w-full" 
                        style={{ backgroundColor: preset.background }}
                      />
                      <div 
                        className="h-1/2 w-full" 
                        style={{ backgroundColor: preset.foreground }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 
                                 group-hover:text-gray-900 dark:group-hover:text-white text-center block
                                 truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:py-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 lg:mb-4">
                Gradient Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleGradientPresetClick(preset)}
                    className="group p-2 lg:p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                             border border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
                    title={preset.description}
                  >
                    <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden 
                                border-2 border-gray-200 dark:border-gray-600 shadow-sm">
                      <div 
                        className="h-1/2 w-full" 
                        style={{ background: preset.background }}
                      />
                      <div 
                        className="h-1/2 w-full" 
                        style={{ background: preset.foregroundGradient }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 
                                 group-hover:text-gray-900 dark:group-hover:text-white text-center block
                                 truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 lg:p-16 rounded-xl flex items-center justify-center mb-6 lg:mb-8">
              <QRPreview />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                File Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="qr"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                            focus:border-indigo-500 dark:focus:border-indigo-400
                            placeholder-gray-400 dark:placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    .png/.svg
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <button 
                  onClick={handleDownloadPNG}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-3 rounded-lg 
                            hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors 
                            flex items-center justify-center text-sm lg:text-base font-medium"
                >
                  <FileImage className="w-5 h-5 mr-2" />
                  PNG
                </button>
                <button 
                  onClick={handleDownloadSVG}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-3 rounded-lg 
                            hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors 
                            flex items-center justify-center text-sm lg:text-base font-medium"
                >
                  <FileCode className="w-5 h-5 mr-2" />
                  SVG
                </button>
              </div>
              <button 
                onClick={handleSaveToProject}
                className="flex-1 bg-purple-600 dark:bg-purple-500 text-white px-6 py-3 rounded-lg 
                          hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors 
                          flex items-center justify-center text-sm lg:text-base font-medium"
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