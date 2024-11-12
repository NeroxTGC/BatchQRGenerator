import React, { useState } from 'react';
import { Upload, Download, Settings, History, Database } from 'lucide-react';
import ProjectPage from './components/ProjectPage';
import Sidebar from './components/Sidebar';
import ProjectsPage from './components/ProjectsPage';
import { QuickGeneratePage } from './components/QuickGeneratePage';
import { APIDocsPage } from './components/APIDocsPage';
import { QRData, QRProject } from './types';

type Page = 'dashboard' | 'projects' | 'quick-generate' | 'api-docs' | 'project';

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentProject, setCurrentProject] = useState<QRProject | null>(null);
  const [projects, setProjects] = useState<QRProject[]>([]);

  const handleProjectSelect = (project: QRProject) => {
    setCurrentProject(project);
    setCurrentPage('project');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleCreateProject = (project: QRProject) => {
    setProjects(prev => [...prev, project]);
    setCurrentProject(project);
    setCurrentPage('project');
  };

  const handleBackToProjects = () => {
    setCurrentProject(null);
    setCurrentPage('projects');
  };

  const handleSaveToProject = (newProject: QRProject) => {
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    setCurrentPage('projects');
  };

  const handleAddToExistingProject = (projectId: string, qrData: QRData) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          data: [...project.data, qrData]
        };
      }
      return project;
    }));
    
    const updatedProject = projects.find(p => p.id === projectId);
    if (updatedProject) {
      setCurrentProject(updatedProject);
      setCurrentPage('projects');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return (
          <ProjectsPage 
            projects={projects}
            onProjectSelect={handleProjectSelect}
            onDeleteProject={handleDeleteProject}
            onCreateProject={handleCreateProject}
          />
        );
      case 'project':
        return currentProject ? (
          <ProjectPage 
            project={currentProject} 
            onBack={handleBackToProjects}
          />
        ) : null;
      case 'quick-generate':
        return (
          <QuickGeneratePage 
            onSaveToProject={handleSaveToProject}
            projects={projects}
            onAddToExistingProject={handleAddToExistingProject}
          />
        );
      case 'api-docs':
        return <APIDocsPage />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Upload className="w-8 h-8 text-indigo-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800">Upload Data</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Import your data from CSV, Excel, or enter manually to generate QR codes in bulk.
              </p>
              <button 
                onClick={() => setCurrentPage('projects')}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start New Project
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <History className="w-8 h-8 text-purple-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800">Recent Projects</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Continue working on your saved projects or start from a template.
              </p>
              <button 
                onClick={() => setCurrentPage('projects')}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                View History
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Settings className="w-8 h-8 text-teal-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800">Quick Generate</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Generate a single QR code quickly with custom styling options.
              </p>
              <button 
                onClick={() => setCurrentPage('quick-generate')}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Single QR
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-rose-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800">API Access</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Generate QR codes programmatically using our REST API.
              </p>
              <button 
                onClick={() => setCurrentPage('api-docs')}
                className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors"
              >
                View API Docs
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-[100dvh] pt-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="h-[calc(100%-6rem)] flex">
        <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1 p-8 overflow-auto">
          <div className="mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;