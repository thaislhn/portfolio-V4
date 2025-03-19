import React from 'react';
import { Folder } from 'lucide-react';

interface FolderGridProps {
  onFolderClick: (section: string) => void;
}

export function FolderGrid({ onFolderClick }: FolderGridProps) {
  const folders = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5">
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => onFolderClick(folder.id)}
          className="flex flex-col items-center p-3 rounded-lg hover:bg-black/5 transition-all"
        >
          <Folder size={64} className="mb-2" />
          <span>{folder.label}</span>
        </button>
      ))}
    </div>
  );
}