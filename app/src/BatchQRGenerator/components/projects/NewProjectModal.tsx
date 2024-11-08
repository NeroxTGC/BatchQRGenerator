import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createProject } from '../../features/projects/operations';
import { QRProject } from '../../types';

interface Props {
  onClose: () => void;
  onCreate: (project: QRProject) => void;
}

export function NewProjectModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const project = await createProject(name, acceptedFiles[0]);
        onCreate(project);
      } catch (err) {
        setError('Failed to create project. Please try again.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Project</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter project name"
            />
          </div>

          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-indigo-600">Drop the files here...</p>
            ) : (
              <p className="text-gray-600">Drag & drop files here, or click to select files</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={!name || isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProjectModal;