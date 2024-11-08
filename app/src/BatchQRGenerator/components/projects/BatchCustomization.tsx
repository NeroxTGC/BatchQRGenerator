import React, { useState } from 'react';
import { Sliders, Layout, Grid, Download, Upload } from 'lucide-react';
import ColorPicker from '../common/ColorPicker';
import { QRSettings } from '../../types';
import { colorPresets, gradientPresets } from '../../constants/colorPresets';

interface Props {
  settings: QRSettings;
  onUpdate: (settings: QRSettings) => void;
}

export default function BatchCustomization({ settings, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'style' | 'layout' | 'export'>('style');
  const [logoUrl, setLogoUrl] = useState(settings.logo?.url || '');

  const patterns = [
    { id: 'square', name: 'Square' },
    { id: 'circle', name: 'Circle' },
    { id: 'hexagon', name: 'Hexagon' }
  ] as const;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setLogoUrl(url);
        onUpdate({
          ...settings,
          logo: { url, size: settings.logo?.size || 24 }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'style' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sliders className="w-4 h-4 mr-2" />
          Style
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'layout' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layout className="w-4 h-4 mr-2" />
          Layout
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'export' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {activeTab === 'style' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Foreground Color"
              value={settings.style.foreground}
              onChange={(color) => onUpdate({
                ...settings,
                style: { ...settings.style, foreground: color }
              })}
            />
            <ColorPicker
              label="Background Color"
              value={settings.style.background}
              onChange={(color) => onUpdate({
                ...settings,
                style: { ...settings.style, background: color }
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pattern Style
            </label>
            <div className="grid grid-cols-3 gap-3">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => onUpdate({
                    ...settings,
                    style: { ...settings.style, pattern: pattern.id }
                  })}
                  className={`p-3 border rounded-lg text-sm transition-colors ${
                    settings.style.pattern === pattern.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter logo URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                      onUpdate({
                        ...settings,
                        logo: e.target.value ? { url: e.target.value, size: settings.logo?.size || 24 } : undefined
                      });
                    }}
                  />
                </div>
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
              {logoUrl && (
                <div className="flex items-center space-x-4">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="w-12 h-12 object-contain border border-gray-200 rounded"
                  />
                  <input
                    type="range"
                    min="16"
                    max="64"
                    value={settings.logo?.size || 24}
                    onChange={(e) => onUpdate({
                      ...settings,
                      logo: { url: logoUrl, size: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">
                    {settings.logo?.size || 24}px
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Color Presets
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onUpdate({
                    ...settings,
                    style: {
                      ...settings.style,
                      foreground: preset.foreground,
                      background: preset.background
                    }
                  })}
                  className="group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title={preset.description}
                >
                  <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden border border-gray-200">
                    <div className="h-1/2 w-full" style={{ backgroundColor: preset.background }} />
                    <div className="h-1/2 w-full" style={{ backgroundColor: preset.foreground }} />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center block">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">
              Gradient Presets
            </label>
            <div className="grid grid-cols-5 gap-3">
              {gradientPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onUpdate({
                    ...settings,
                    style: {
                      ...settings.style,
                      foreground: preset.foreground,
                      background: preset.background,
                      gradient: preset.foregroundGradient
                    }
                  })}
                  className="group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title={preset.description}
                >
                  <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden border border-gray-200">
                    <div className="h-1/2 w-full" style={{ backgroundColor: preset.background }} />
                    <div className="h-1/2 w-full" style={{ background: preset.foregroundGradient }} />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center block">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'layout' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Size (px)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="100"
                max="400"
                step="10"
                value={settings.size}
                onChange={(e) => onUpdate({
                  ...settings,
                  size: Number(e.target.value)
                })}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {settings.size}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error Correction Level
            </label>
            <select
              value={settings.errorCorrection}
              onChange={(e) => onUpdate({
                ...settings,
                errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="L">Low (7% recovery)</option>
              <option value="M">Medium (15% recovery)</option>
              <option value="Q">Quartile (25% recovery)</option>
              <option value="H">High (30% recovery)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Higher correction levels make QR codes more reliable but larger
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiet Zone (Margin)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="4"
                value={settings.margin || 1}
                onChange={(e) => onUpdate({
                  ...settings,
                  margin: Number(e.target.value)
                })}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {settings.margin || 1} modules
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-3 border border-indigo-500 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
                PNG
              </button>
              <button className="p-3 border border-gray-200 hover:border-indigo-500 rounded-lg text-sm transition-colors">
                SVG
              </button>
              <button className="p-3 border border-gray-200 hover:border-indigo-500 rounded-lg text-sm transition-colors">
                PDF
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Naming Pattern
            </label>
            <input
              type="text"
              placeholder="e.g., qr_{index}_{date}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Available variables: {'{index}'}, {'{date}'}, {'{content}'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Generate ZIP archive
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Include CSV manifest
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Create single PDF with all codes
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality Settings
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  PNG Resolution (DPI)
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="72">72 DPI (Screen)</option>
                  <option value="150">150 DPI (Standard Print)</option>
                  <option value="300">300 DPI (High Quality)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  PDF Page Size
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}