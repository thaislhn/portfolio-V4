import React from 'react';
import { Window } from './Window';

interface AboutWindowProps {
  onClose: () => void;
}

export function AboutWindow({ onClose }: AboutWindowProps) {
  return (
    <Window title="About" onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Thaïs L'Hocine</h1>
        <p className="text-lg text-gray-700">
          Étudiante passionnée à l'école des Gobelins en DN MADE Design, je combine créativité 
          et innovation dans chacun de mes projets. Mon approche du design est influencée par 
          l'esthétique vintage et les nouvelles technologies.
        </p>
      </div>
    </Window>
  );
}