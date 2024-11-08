import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRProject, QRData } from '../types';
import BatchCustomization from './projects/BatchCustomization';
import DataPreview from './projects/DataPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './common/Tabs';
import { ArrowLeft, Save, Download, Share2, Table, Grid, Settings, Trash2 } from 'lucide-react';
import TemplateGallery from './projects/TemplateGallery';

interface Props {
  project: QRProject;
  onBack: () => void;
}

export default function ProjectPage({ project, onBack }: Props) {
  const [currentProject, setCurrentProject] = useState(project);
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const handleUpdateSettings = (newSettings: typeof project.settings) => {
    setCurrentProject(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  const handleDeleteQR = (id: string) => {
    setCurrentProject(prev => ({
      ...prev,
      data: prev.data.filter(item => item.id !== id)
    }));
  };

  const handleEditQR = (id: string, content: string) => {
    setCurrentProject(prev => ({
      ...prev,
      data: prev.data.map(item => 
        item.id === id ? { ...item, content } : item
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentProject.name}</h1>
            <p className="text-sm text-gray-500">
              Created {currentProject.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="data">
        <TabsList>
          <TabsTrigger value="data">
            <Table className="w-4 h-4 mr-2" />
            Data
          </TabsTrigger>
          <TabsTrigger value="customize">
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Grid className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'grid' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'table' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Table className="w-5 h-5" />
                </button>
              </div>

              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Add More Data
              </button>
            </div>

            {view === 'grid' ? (
              <DataPreview
                data={currentProject.data}
                settings={currentProject.settings}
                onDelete={handleDeleteQR}
                onEdit={handleEditQR}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Content</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Label</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Preview</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProject.data.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="px-4 py-3 text-sm text-gray-600">{item.content}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{item.label}</td>
                        <td className="px-4 py-3">
                          <QRCodeCanvas
                            value={item.content}
                            size={80}
                            level={currentProject.settings.errorCorrection}
                            fgColor={currentProject.settings.style.foreground}
                            bgColor={currentProject.settings.style.background}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditQR(item.id, item.content)}
                              className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteQR(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="mt-6">
          <BatchCustomization
            settings={currentProject.settings}
            onUpdate={handleUpdateSettings}
          />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateGallery
            onSelectTemplate={(settings) => handleUpdateSettings(settings)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}