import { describe, it, expect } from 'vitest';
import { gameReducer, INITIAL_STATE } from '../game/reducer';
import type { Action } from '../game/reducer';

describe('gameReducer', () => {
  it('should start game from intro', () => {
     const action: Action = { type: 'START_GAME' };
     const newState = gameReducer(INITIAL_STATE, action);
     expect(newState.phase).toBe('playing');
  });

  it('should spawn a part when child taps button', () => {
    // Start Game first
    let state = gameReducer(INITIAL_STATE, { type: 'START_GAME' });

    const action: Action = {
      type: 'TAP_CHILD_BUTTON',
      payload: { type: 'arch', color: 'blue' }
    };
    const newState = gameReducer(state, action);
    expect(newState.draggableParts).toHaveLength(1);
    expect(newState.draggableParts[0].type).toBe('arch');
    expect(newState.draggableParts[0].color).toBe('blue');
  });

  it('should move a dragging part', () => {
    // Start Game
    let state = gameReducer(INITIAL_STATE, { type: 'START_GAME' });
    
    // First spawn
    const spawnAction: Action = { type: 'TAP_CHILD_BUTTON', payload: { type: 'arch', color: 'blue' } };
    state = gameReducer(state, spawnAction);
    const partId = state.draggableParts[0].id;

    // Start Drag
    state = gameReducer(state, { type: 'START_DRAG', payload: { id: partId } });
    expect(state.draggableParts[0].isDragging).toBe(true);

    // Move
    const newPos = { x: 50, y: 50 };
    state = gameReducer(state, { type: 'MOVE_DRAG', payload: { id: partId, position: newPos } });
    expect(state.draggableParts[0].position).toEqual(newPos);
  });

  it('should lock part if dropped near correct slot', () => {
    // Start Game
    let state = gameReducer(INITIAL_STATE, { type: 'START_GAME' });

    // Setup state manually with one part near slot
    // Level 1 slot is at 50, 60 (Arch, Blue)
    const slotPos = INITIAL_STATE.slots[0].position;
    
    // Spawn part
    const spawnAction: Action = { type: 'TAP_CHILD_BUTTON', payload: { type: 'arch', color: 'blue' } };
    state = gameReducer(state, spawnAction);
    const partId = state.draggableParts[0].id;

    // Start dragging
    state = gameReducer(state, { type: 'START_DRAG', payload: { id: partId } });

    // Move close to slot
    state = gameReducer(state, { 
      type: 'MOVE_DRAG', 
      payload: { id: partId, position: { x: slotPos.x + 1, y: slotPos.y + 1 } } 
    });

    // End drag
    state = gameReducer(state, { type: 'END_DRAG', payload: { id: partId } });

    // Expect part to be removed from draggableParts (consumed) and slot to be filled
    expect(state.draggableParts).toHaveLength(0);
    expect(state.slots[0].isFilled).toBe(true);
    expect(state.isLevelComplete).toBe(true);
  });
});
