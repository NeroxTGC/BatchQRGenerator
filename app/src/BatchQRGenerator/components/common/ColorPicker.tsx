import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={label}
        />
        <label
          htmlFor={label}
          className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full border border-gray-200 mr-2"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm text-gray-600">{value}</span>
          </div>
          <Palette className="w-5 h-5 text-gray-400" />
        </label>
      </div>
    </div>
  );
}