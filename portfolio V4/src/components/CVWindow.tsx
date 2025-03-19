import React from 'react';
import { Window } from './Window';

interface CVWindowProps {
  onClose: () => void;
}

export function CVWindow({ onClose }: CVWindowProps) {
  return (
    <Window title="CV" onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Curriculum Vitae</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-3">Formation</h3>
            <p>DN MADE Design - École des Gobelins</p>
          </section>
          
          <section>
            <h3 className="text-xl font-bold mb-3">Compétences</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Design graphique</li>
              <li>Motion design</li>
              <li>Modélisation 3D</li>
              <li>Conception UI/UX</li>
            </ul>
          </section>
        </div>
      </div>
    </Window>
  );
}