import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Edit2, Download, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { QRData, QRSettings } from '../../types';
import { downloadQR } from '../../utils/downloadQR';

interface Props {
  data: QRData[];
  settings: QRSettings;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export default function DataPreview({ data, settings, onDelete, onEdit }: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                data-qr-id={item.id}
                value={item.content}
                size={settings.size}
                level={settings.errorCorrection}
                fgColor={settings.style.foreground}
                bgColor={settings.style.background}
              />
            </div>
            
            <div className="text-sm text-gray-600 truncate mb-2">
              {item.content}
            </div>
            
            {item.label && (
              <div className="text-xs text-gray-500 truncate mb-3">
                {item.label}
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={() => onEdit(item.id, item.content)}
                className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => {
                  const canvas = document.querySelector(`canvas[data-qr-id="${item.id}"]`);
                  downloadQR(canvas as HTMLCanvasElement, `qr-${item.label || item.id}`);
                }}
                className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}