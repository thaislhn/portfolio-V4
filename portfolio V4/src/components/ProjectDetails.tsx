import React from 'react';
import { Window } from './Window';
import { projects } from '../data/projects';

interface ProjectDetailsProps {
  projectId: number;
  onClose: () => void;
}

export function ProjectDetails({ projectId, onClose }: ProjectDetailsProps) {
  const project = projects.find(p => p.id === projectId);
  
  if (!project) return null;

  return (
    <Window title={project.title} onClose={onClose}>
      <div className="max-w-4xl mx-auto">
        {project.type === 'video' && project.videoId ? (
          <div className="aspect-video mb-6">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${project.videoId}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : project.type === 'photo-gallery' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {project.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${project.title} - Photo ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-h-[500px] object-cover rounded-lg mb-6"
          />
        )}
        
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-700">{project.description}</p>
        </div>
      </div>
    </Window>
  );
}