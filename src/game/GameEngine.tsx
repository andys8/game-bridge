import React, { useReducer, useEffect } from 'react';
import { gameReducer, INITIAL_STATE } from './reducer';
import { ChildControls } from '../components/ChildControls';
import { ParentBridgeBuilder } from '../components/ParentBridgeBuilder';

// Simple Audio Synth
const playTone = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.1) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio error", e);
  }
};

export const GameEngine: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  // Sound & Feedback Effect
  useEffect(() => {
    if (state.feedbackQueue.length > 0) {
      const latest = state.feedbackQueue[state.feedbackQueue.length - 1];
      // Play sound based on type
      if (latest.type === 'unlock') playTone(440, 'sine', 0.1); // Ding
      if (latest.type === 'success') playTone(880, 'triangle', 0.3); // High Ding
      if (latest.type === 'error') playTone(150, 'sawtooth', 0.2); // Buzz
      
      // We could clear the feedback here or let it expire
      // dispatch({ type: 'CLEAR_FEEDBACK', payload: { id: latest.id } });
    }
  }, [state.feedbackQueue]);

  // Level Complete Effect
  useEffect(() => {
    if (state.isLevelComplete) {
      playTone(523.25, 'sine', 0.1);
      setTimeout(() => playTone(659.25, 'sine', 0.1), 100);
      setTimeout(() => playTone(783.99, 'sine', 0.2), 200);

      const timer = setTimeout(() => {
        dispatch({ type: 'NEXT_LEVEL' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.isLevelComplete]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* 
         Split Screen Layout 
         For Portrait (default mobile): Father Top (Bridge), Child Bottom (Controls).
         We can make this responsive to orientation if needed.
         Tailwind 'md:flex-row' can switch it to side-by-side on larger screens/landscape.
      */}
      
      {/* Father Area (Top/Right) - 60% height in portrait */}
      <div className="flex-1 border-b-8 border-gray-300 relative z-0"> 
          {/* Rotate 180 deg option for face-to-face play? 
              Gemini.md says "Father and child play together on the same tablet...". 
              Usually side-by-side or lap. Let's keep standard orientation.
          */}
          <ParentBridgeBuilder state={state} dispatch={dispatch} />
      </div>

      {/* Child Area (Bottom/Left) - 40% height in portrait */}
      <div className="h-2/5 md:h-full md:w-2/5 relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <ChildControls 
          buttons={state.childButtons} 
          onTap={(type, color) => dispatch({ type: 'TAP_CHILD_BUTTON', payload: { type, color } })} 
        />
      </div>
    </div>
  );
};