import React, { useRef } from 'react';
import type { Action } from '../game/reducer';
import type { GameState, DraggablePart, BridgeSlot } from '../game/types';
import { ShapeRenderer } from '../assets/Shapes';

interface ParentProps {
  state: GameState;
  dispatch: React.Dispatch<Action>;
}

export const ParentBridgeBuilder: React.FC<ParentProps> = ({ state, dispatch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragMap = useRef<Record<number, string>>({});

  // Helper to convert event client coordinates to % within container
  const getRelativePos = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent, part: DraggablePart) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only allow left click or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Register this pointer as dragging this part
    dragMap.current[e.pointerId] = part.id;
    (e.target as Element).setPointerCapture(e.pointerId);

    dispatch({ type: 'START_DRAG', payload: { id: part.id } });
  };

  const handlePartPointerMove = (e: React.PointerEvent) => {
      const partId = dragMap.current[e.pointerId];
      if (!partId) return;
      
      e.preventDefault();
      const pos = getRelativePos(e.clientX, e.clientY);
      dispatch({ type: 'MOVE_DRAG', payload: { id: partId, position: pos } });
  };

   const handlePartPointerUp = (e: React.PointerEvent) => {
      const partId = dragMap.current[e.pointerId];
      if (!partId) return;
      
      e.preventDefault();
      dispatch({ type: 'END_DRAG', payload: { id: partId } });
      delete dragMap.current[e.pointerId];
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-blue-50 overflow-hidden touch-none"
    >
        {/* Background / Environment - Simple River/Sky */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute bottom-0 w-full h-1/4 bg-blue-300"></div> {/* Water */}
            <div className="absolute bottom-1/4 w-full h-4 bg-green-200"></div> {/* Bank */}
        </div>

        {/* Target Slots (Ghost) */}
        {state.slots.map((slot: BridgeSlot) => (
            <div
                key={slot.id}
                className={`absolute transition-all duration-300 ${slot.isFilled ? 'opacity-100' : 'opacity-30 border-2 border-dashed border-gray-400'}`}
                style={{
                    left: `${slot.position.x}%`,
                    top: `${slot.position.y}%`,
                    width: '15%', // Standard Size relative to container
                    height: '15%',
                    transform: 'translate(-50%, -50%)', // Center anchor
                }}
            >
                {/* If filled, show the part solid. If not, show ghost */}
                <ShapeRenderer 
                    type={slot.type} 
                    color={slot.color} 
                    className="w-full h-full"
                    style={{ filter: slot.isFilled ? 'none' : 'grayscale(100%)' }}
                />
            </div>
        ))}

        {/* Draggable Parts */}
        {state.draggableParts.map((part: DraggablePart) => (
            <div
                key={part.id}
                onPointerDown={(e) => handlePointerDown(e, part)}
                onPointerMove={handlePartPointerMove}
                onPointerUp={handlePartPointerUp}
                onPointerCancel={handlePartPointerUp}
                className="absolute cursor-grab active:cursor-grabbing touch-none"
                style={{
                    left: `${part.position.x}%`,
                    top: `${part.position.y}%`,
                    width: '15%',
                    height: '15%',
                    transform: `translate(-50%, -50%) scale(${part.isDragging ? 1.2 : 1})`,
                    zIndex: part.isDragging ? 50 : 10,
                    transition: part.isDragging ? 'none' : 'transform 0.2s, left 0.1s, top 0.1s' 
                    // No transition on left/top during drag for responsiveness
                }}
            >
                <ShapeRenderer 
                    type={part.type} 
                    color={part.color} 
                    className="w-full h-full drop-shadow-xl"
                />
            </div>
        ))}

        {/* Level Complete Overlay */}
        {state.isLevelComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in">
                <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform animate-bounce">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Bridge Complete! 🎉</h2>
                    <p className="text-lg text-gray-600">Great Teamwork!</p>
                </div>
            </div>
        )}
    </div>
  );
};