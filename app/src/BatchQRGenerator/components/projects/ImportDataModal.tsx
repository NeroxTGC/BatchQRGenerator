import React, { useState } from 'react';
import { X, Upload, FileText, Table } from 'lucide-react';

interface Props {
  onClose: () => void;
  onImport: (data: { content: string; label?: string }[]) => void;
}

export default function ImportDataModal({ onClose, onImport }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [separator, setSeparator] = useState(',');
  const [importType, setImportType] = useState<'csv' | 'txt'>('txt');
  const [error, setError] = useState('');

  const handleFileRead = async (file: File) => {
    try {
      const content = await readFileContent(file);
      let parsedData: { content: string; label?: string }[] = [];

      if (importType === 'csv') {
        parsedData = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [content, label] = line.split(separator);
            return { content: content.trim(), label: label?.trim() };
          });
      } else {
        parsedData = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => ({ content: line.trim() }));
      }

      onImport(parsedData);
      onClose();
    } catch (err) {
      setError('Error reading file');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Import Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setImportType('txt')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                importType === 'txt' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200'
              }`}
            >
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Text File</div>
              <div className="text-xs text-gray-500">One QR code per line</div>
            </button>
            <button
              onClick={() => setImportType('csv')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                importType === 'csv' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200'
              }`}
            >
              <Table className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">CSV File</div>
              <div className="text-xs text-gray-500">Content and labels</div>
            </button>
          </div>

          {importType === 'csv' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Separator
              </label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
              </select>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept={importType === 'csv' ? '.csv' : '.txt'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => file && handleFileRead(file)}
              disabled={!file}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
} 