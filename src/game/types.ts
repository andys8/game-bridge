export type PartType = 'arch' | 'platform' | 'pillar' | 'triangle';
export type PartColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

export interface Position {
  x: number;
  y: number;
}

export interface BridgeSlot {
  id: string;
  type: PartType;
  color: PartColor;
  position: Position; // Relative to the bridge container (0-100%)
  rotation?: number;
  isFilled: boolean;
}

export interface DraggablePart {
  id: string;
  type: PartType;
  color: PartColor;
  position: Position; // Current position on screen (pixels or %)
  isLocked: boolean; // True if placed correctly in a slot
  isDragging: boolean;
}

export interface ChildButton {
  id: string;
  type: PartType;
  color: PartColor;
  icon: string; // Emoji or SVG path ID
}

export interface LevelConfig {
  id: number;
  slots: BridgeSlot[];
  availableChildButtons: ChildButton[];
}

export interface GameState {
  currentLevelIndex: number;
  slots: BridgeSlot[];
  draggableParts: DraggablePart[];
  childButtons: ChildButton[];
  isLevelComplete: boolean;
  score: number;
  feedbackQueue: FeedbackItem[];
}

export interface FeedbackItem {
  id: string;
  type: 'success' | 'error' | 'unlock';
  position?: Position;
  timestamp: number;
}
