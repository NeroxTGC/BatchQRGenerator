import React from 'react';
import { Upload, Palette, Download, History, Settings } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: 'dashboard' | 'projects' | 'quick-generate' | 'api-docs') => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const getButtonClass = (page: string) => `
    p-2.5 w-12 mx-auto rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center
    ${currentPage === page 
      ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
      : 'text-gray-600 hover:text-indigo-600'
    }
  `;

  return (
    <aside className="w-16 bg-white shadow-lg h-full my-4 ml-4 rounded-2xl flex flex-col items-center py-6">
      <nav className="flex-1 w-full flex flex-col items-center space-y-6">
        <button 
          className={getButtonClass('dashboard')}
          onClick={() => onNavigate('dashboard')}
        >
          <Upload className="w-5 h-5" />
        </button>
        <button 
          className={getButtonClass('quick-generate')}
          onClick={() => onNavigate('quick-generate')}
        >
          <Palette className="w-5 h-5" />
        </button>
        <button 
          className={getButtonClass('projects')}
          onClick={() => onNavigate('projects')}
        >
          <History className="w-5 h-5" />
        </button>
        <button 
          className={getButtonClass('api-docs')}
          onClick={() => onNavigate('api-docs')}
        >
          <Download className="w-5 h-5" />
        </button>
      </nav>
      <button className="p-2.5 w-12 mx-auto rounded-lg hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors mt-auto flex items-center justify-center">
        <Settings className="w-5 h-5" />
      </button>
    </aside>
  );
}