import React from 'react';
import { Key, Send, Code2, Lock } from 'lucide-react';

const APIDocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">API Documentation</h2>
        
        <div className="grid gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Key className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication</h3>
              <p className="text-gray-600 mb-4">
                Use your API key to authenticate requests. You can manage your API keys in the dashboard.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-800">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Send className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Generate QR Code</h3>
              <p className="text-gray-600 mb-4">
                Send a POST request to generate a new QR code with custom parameters.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-800">
                  POST /api/v1/generate
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Code2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Request</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`{
  "content": "https://example.com",
  "size": 200,
  "errorCorrection": "H",
  "style": {
    "foreground": "#000000",
    "background": "#ffffff",
    "pattern": "square"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Rate Limits</h3>
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 mb-2">1,000</div>
            <div className="text-sm text-gray-600">Requests per day</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 mb-2">100</div>
            <div className="text-sm text-gray-600">Requests per minute</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 mb-2">10MB</div>
            <div className="text-sm text-gray-600">Max file size</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { APIDocsPage };