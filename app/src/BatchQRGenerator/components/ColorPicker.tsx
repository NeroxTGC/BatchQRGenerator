import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex-1 max-w-[48%]">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-purple-900/30 
                   border border-purple-200 dark:border-purple-500/30 
                   text-gray-900 dark:text-white 
                   placeholder-gray-500 dark:placeholder-purple-300
                   focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                   focus:border-transparent
                   transition-colors duration-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
} 