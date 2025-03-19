import React from 'react';
import { X } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Window({ title, children, onClose }: WindowProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[5px_5px_0_rgba(0,0,0,0.5)] w-full max-w-3xl mx-auto overflow-hidden">
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center cursor-move">
        <div className="font-bold">{title}</div>
        {onClose && (
          <button onClick={onClose} className="text-white text-xl hover:text-gray-300">
            <X size={20} />
          </button>
        )}
      </div>
      <div className="p-5 bg-white">{children}</div>
    </div>
  );
}