import React, { useState } from 'react';
import type { ChildButton, PartType, PartColor } from '../game/types';
import { ShapeRenderer } from '../assets/Shapes';

interface ChildControlsProps {
  buttons: ChildButton[];
  onTap: (type: PartType, color: PartColor) => void;
}

export const ChildControls: React.FC<ChildControlsProps> = ({ buttons, onTap }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePointerDown = (btn: ChildButton) => {
    setActiveId(btn.id);
    onTap(btn.type, btn.color);
    
    // Reset active state after short delay for animation reset
    setTimeout(() => setActiveId(null), 200);
  };

  return (
    <div className="w-full h-full bg-yellow-50 p-4 grid grid-cols-2 gap-4 place-items-center">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          className={`
            relative w-32 h-32 rounded-3xl shadow-lg border-4 border-white
            transition-transform duration-100 flex items-center justify-center bg-white
            ${activeId === btn.id ? 'scale-90 bg-yellow-100 ring-4 ring-yellow-400' : 'scale-100'}
          `}
          onPointerDown={(e) => {
            e.preventDefault(); // Prevent default touch behavior
            handlePointerDown(btn);
          }}
          style={{ touchAction: 'none' }}
        >
          <div className="w-20 h-20 pointer-events-none">
            <ShapeRenderer type={btn.type} color={btn.color} />
          </div>
        </button>
      ))}
    </div>
  );
};