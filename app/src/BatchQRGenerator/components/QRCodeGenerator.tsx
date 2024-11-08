import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, Palette } from 'lucide-react';
import { QRProject } from '../types';

interface Props {
  project: QRProject;
}

export default function QRCodeGenerator({ project }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">QR Code Generator</h2>
      <div className="flex gap-8">
        <div className="flex-1">
          {/* Preview Section */}
          <div className="bg-gray-50 p-8 rounded-xl flex items-center justify-center">
            <QRCodeCanvas
              value="https://example.com"
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "https://example.com/logo.png",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          {/* Controls Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter URL or text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <input
                type="range"
                min="100"
                max="400"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Correction
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="L">Low</option>
                <option value="M">Medium</option>
                <option value="Q">Quartile</option>
                <option value="H">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}