import React from 'react';
import { QRProject } from '../../types';
import { Clock, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: QRProject[];
  onSelect: (projectId: string) => void;
}

export default function SelectProjectModal({ isOpen, onClose, projects, onSelect }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Project</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onSelect(project.id)}
              className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="font-medium text-gray-800">{project.name}</div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {project.createdAt.toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 