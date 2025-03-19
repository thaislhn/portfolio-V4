import React from 'react';
import { Window } from './Window';
import { projects } from '../data/projects';
import { Play } from 'lucide-react';

interface ProjectsWindowProps {
  onClose: () => void;
  onProjectClick: (id: number) => void;
}

export function ProjectsWindow({ onClose, onProjectClick }: ProjectsWindowProps) {
  return (
    <Window title="Projects" onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-2 border-black rounded-lg overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onProjectClick(project.id)}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              {project.type === 'video' && (
                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  <Play size={16} />
                  <span>Video</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}