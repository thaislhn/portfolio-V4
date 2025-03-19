import React from 'react';
import { Window } from './Window';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface ContactWindowProps {
  onClose: () => void;
}

export function ContactWindow({ onClose }: ContactWindowProps) {
  return (
    <Window title="Contact" onClose={onClose}>
      <div className="max-w-md mx-auto space-y-4">
        <a
          href="mailto:thais.lhocine@edu.gobelins.fr"
          className="flex items-center gap-3 p-4 border-2 border-black rounded-lg hover:bg-black/5 transition-all"
        >
          <Mail />
          <span>thais.lhocine@edu.gobelins.fr</span>
        </a>
        
        <a
          href="tel:0766667687"
          className="flex items-center gap-3 p-4 border-2 border-black rounded-lg hover:bg-black/5 transition-all"
        >
          <Phone />
          <span>07 66 66 76 87</span>
        </a>
        
        <a
          href="https://www.linkedin.com/in/thaïs-l'hocine-795747280/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-black rounded-lg hover:bg-black/5 transition-all"
        >
          <Linkedin />
          <span>Thaïs L'Hocine</span>
        </a>
      </div>
    </Window>
  );
}