import type { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    slots: [
      {
        id: 'l1-s1',
        type: 'arch',
        color: 'blue',
        position: { x: 50, y: 60 },
        isFilled: false
      }
    ],
    availableChildButtons: [
      { id: 'btn-1', type: 'arch', color: 'blue', icon: 'arch' }
    ]
  },
  {
    id: 2,
    slots: [
      {
        id: 'l2-s1',
        type: 'pillar',
        color: 'red',
        position: { x: 30, y: 70 },
        isFilled: false
      },
      {
        id: 'l2-s2',
        type: 'pillar',
        color: 'red',
        position: { x: 70, y: 70 },
        isFilled: false
      },
      {
        id: 'l2-s3',
        type: 'platform',
        color: 'green',
        position: { x: 50, y: 40 },
        isFilled: false
      }
    ],
    availableChildButtons: [
      { id: 'btn-2', type: 'pillar', color: 'red', icon: 'pillar' },
      { id: 'btn-3', type: 'platform', color: 'green', icon: 'platform' }
    ]
  },
   {
    id: 3,
    slots: [
      { id: 'l3-s1', type: 'pillar', color: 'yellow', position: { x: 20, y: 70 }, isFilled: false },
      { id: 'l3-s2', type: 'pillar', color: 'yellow', position: { x: 80, y: 70 }, isFilled: false },
      { id: 'l3-s3', type: 'arch', color: 'purple', position: { x: 50, y: 70 }, isFilled: false },
      { id: 'l3-s4', type: 'platform', color: 'blue', position: { x: 50, y: 40 }, isFilled: false }
    ],
    availableChildButtons: [
      { id: 'btn-4', type: 'pillar', color: 'yellow', icon: 'pillar' },
      { id: 'btn-5', type: 'arch', color: 'purple', icon: 'arch' },
      { id: 'btn-6', type: 'platform', color: 'blue', icon: 'platform' }
    ]
  }
];