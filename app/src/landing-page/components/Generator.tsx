import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Plus, Trash2 } from 'lucide-react';

export default function Generator() {
  const [qrCodes, setQrCodes] = useState([{ id: 1, content: '', name: 'QR Code 1' }]);

  const addQrCode = () => {
    const newId = qrCodes.length + 1;
    setQrCodes([...qrCodes, { id: newId, content: '', name: `QR Code ${newId}` }]);
  };

  const removeQrCode = (id: number) => {
    setQrCodes(qrCodes.filter(qr => qr.id !== id));
  };

  const updateQrCode = (id: number, content: string) => {
    setQrCodes(qrCodes.map(qr => 
      qr.id === id ? { ...qr, content } : qr
    ));
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-black py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Generate Your QR Codes</h2>
          <p className="text-gray-600 dark:text-purple-200">Create multiple QR codes at once with our batch generator</p>
        </motion.div>

        <div className="grid gap-8">
          {qrCodes.map((qr) => (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 rounded-xl bg-white/50 dark:bg-purple-900/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter URL or text..."
                    value={qr.content}
                    onChange={(e) => updateQrCode(qr.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 
                             text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-purple-300 
                             focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  {qr.content && (
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <QRCodeSVG value={qr.content} size={128} />
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeQrCode(qr.id)}
                    className="p-2 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 
                             hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addQrCode}
            className="px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-semibold 
                     flex items-center gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            Add QR Code
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 
                     font-semibold flex items-center gap-2 hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors duration-300"
          >
            <Download className="w-5 h-5" />
            Download All
          </motion.button>
        </div>
      </div>
    </div>
  );
}