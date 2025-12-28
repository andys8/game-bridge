import type { GameState, PartType, PartColor, DraggablePart, Position, FeedbackItem } from './types';
import { LEVELS } from './levels';

export type Action =
  | { type: 'TAP_CHILD_BUTTON'; payload: { type: PartType; color: PartColor } }
  | { type: 'START_DRAG'; payload: { id: string } }
  | { type: 'MOVE_DRAG'; payload: { id: string; position: Position } }
  | { type: 'END_DRAG'; payload: { id: string } }
  | { type: 'NEXT_LEVEL' }
  | { type: 'RESET_GAME' }
  | { type: 'CLEAR_FEEDBACK'; payload: { id: string } };

export const INITIAL_STATE: GameState = {
  currentLevelIndex: 0,
  slots: LEVELS[0].slots,
  childButtons: LEVELS[0].availableChildButtons,
  draggableParts: [],
  isLevelComplete: false,
  score: 0,
  feedbackQueue: []
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

const SNAP_DISTANCE_THRESHOLD = 15; // Percent of screen dimension roughly

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'TAP_CHILD_BUTTON': {
      console.log('Reducer: TAP_CHILD_BUTTON', action.payload);
      // Spawn a new part.
      // Limit number of loose parts to avoid clutter (e.g., max 5)
      const looseParts = state.draggableParts.filter(p => !p.isLocked);
      if (looseParts.length >= 5) return state;

      const newPart: DraggablePart = {
        id: generateId(),
        type: action.payload.type,
        color: action.payload.color,
        // Spawn at random position in "Inbox" area (e.g., bottom/side of parent screen)
        // We will handle specific coordinate mapping in the UI, but here we set initial logic coordinates
        position: { x: 50 + (Math.random() * 20 - 10), y: 50 + (Math.random() * 10 - 5) },
        isLocked: false,
        isDragging: false
      };

      const feedback: FeedbackItem = {
        id: generateId(),
        type: 'unlock',
        timestamp: Date.now()
      };

      return {
        ...state,
        draggableParts: [...state.draggableParts, newPart],
        feedbackQueue: [...state.feedbackQueue, feedback]
      };
    }

    case 'START_DRAG': {
      return {
        ...state,
        draggableParts: state.draggableParts.map(p =>
          p.id === action.payload.id && !p.isLocked ? { ...p, isDragging: true } : p
        )
      };
    }

    case 'MOVE_DRAG': {
      return {
        ...state,
        draggableParts: state.draggableParts.map(p =>
          p.id === action.payload.id && p.isDragging ? { ...p, position: action.payload.position } : p
        )
      };
    }

    case 'END_DRAG': {
      const part = state.draggableParts.find(p => p.id === action.payload.id);
      if (!part || !part.isDragging) return state;

      // Check for snap target
      let matchedSlotId: string | null = null;

      // Simple distance check (assuming coordinates are consistently % or pixels)
      for (const slot of state.slots) {
        if (slot.isFilled) continue;
        if (slot.type !== part.type || slot.color !== part.color) continue;

        const dx = slot.position.x - part.position.x;
        const dy = slot.position.y - part.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < SNAP_DISTANCE_THRESHOLD) {
          matchedSlotId = slot.id;
          break;
        }
      }

      if (matchedSlotId) {
        // Success!
        const newSlots = state.slots.map(s =>
          s.id === matchedSlotId ? { ...s, isFilled: true } : s
        );
        
        const feedback: FeedbackItem = {
           id: generateId(),
           type: 'success',
           timestamp: Date.now()
        };
        
        const isLevelComplete = newSlots.every(s => s.isFilled);

        return {
          ...state,
          slots: newSlots,
          draggableParts: state.draggableParts.filter(p => p.id !== part.id), // Remove from draggable list as it is now "in" the slot
          isLevelComplete,
          feedbackQueue: [...state.feedbackQueue, feedback]
        };
      } else {
        const feedback: FeedbackItem = {
           id: generateId(),
           type: 'error',
           timestamp: Date.now()
        };

        return {
          ...state,
          draggableParts: state.draggableParts.map(p =>
            p.id === part.id ? { ...p, isDragging: false } : p
          ),
          feedbackQueue: [...state.feedbackQueue, feedback]
        };
      }
    }

    case 'NEXT_LEVEL': {
      const nextIndex = (state.currentLevelIndex + 1) % LEVELS.length;
      return {
        ...state,
        currentLevelIndex: nextIndex,
        slots: LEVELS[nextIndex].slots,
        childButtons: LEVELS[nextIndex].availableChildButtons,
        draggableParts: [],
        isLevelComplete: false,
        feedbackQueue: []
      };
    }
    
    case 'RESET_GAME': {
       return INITIAL_STATE;
    }

    case 'CLEAR_FEEDBACK': {
      return {
        ...state,
        feedbackQueue: state.feedbackQueue.filter(f => f.id !== action.payload.id)
      };
    }

    default:
      return state;
  }
}