import React, { useState } from 'react';
import { Clock, Star, Trash2, Plus, Search, Filter } from 'lucide-react';
import { QRProject } from '../types';
import NewProjectModal from './projects/NewProjectModal';

interface ProjectsPageProps {
  projects: QRProject[];
  onProjectSelect: (project: QRProject) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateProject: (project: QRProject) => void;
}

export const ProjectsPage = ({ projects, onProjectSelect, onDeleteProject, onCreateProject }: ProjectsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const handleCreateProject = (project: QRProject) => {
    onCreateProject(project);
    setIsNewProjectModalOpen(false);
  };

  const filteredProjects = projects
    .filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aFav = favorites.has(a.id);
      const bFav = favorites.has(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    }); 

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button 
          onClick={() => setIsNewProjectModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first QR code project</p>
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
              onClick={() => onProjectSelect(project)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    {project.name}
                    {favorites.has(project.id) && (
                      <span className="ml-2 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.createdAt.toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {project.data.length} QR codes
                  </div>
                </div>
                <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                  <button 
                    className={`p-2 transition-colors ${
                      favorites.has(project.id) 
                        ? 'text-yellow-500' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    onClick={() => toggleFavorite(project.id)}
                  >
                    <Star className={`w-5 h-5 ${favorites.has(project.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isNewProjectModalOpen && (
        <NewProjectModal
          onClose={() => setIsNewProjectModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
};

export default ProjectsPage;