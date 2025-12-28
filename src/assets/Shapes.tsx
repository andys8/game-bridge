import React from 'react';
import type { PartColor } from '../game/types';

interface ShapeProps {
  color: PartColor;
  className?: string;
  style?: React.CSSProperties;
}

const COLOR_MAP: Record<PartColor, string> = {
  red: '#EF4444',
  blue: '#3B82F6',
  green: '#10B981',
  yellow: '#F59E0B',
  purple: '#8B5CF6',
  orange: '#F97316'
};

export const ArchShape: React.FC<ShapeProps> = ({ color, className, style }) => (
  <svg viewBox="0 0 100 60" className={className} style={{ fill: COLOR_MAP[color], ...style }}>
    <path d="M10,60 L10,50 Q10,10 50,10 Q90,10 90,50 L90,60 L70,60 L70,50 Q70,30 50,30 Q30,30 30,50 L30,60 Z" />
  </svg>
);

export const PillarShape: React.FC<ShapeProps> = ({ color, className, style }) => (
  <svg viewBox="0 0 40 100" className={className} style={{ fill: COLOR_MAP[color], ...style }}>
    <rect x="5" y="5" width="30" height="90" rx="4" />
    <rect x="0" y="0" width="40" height="10" rx="2" />
    <rect x="0" y="90" width="40" height="10" rx="2" />
  </svg>
);

export const PlatformShape: React.FC<ShapeProps> = ({ color, className, style }) => (
  <svg viewBox="0 0 100 30" className={className} style={{ fill: COLOR_MAP[color], ...style }}>
    <rect x="0" y="5" width="100" height="20" rx="5" />
  </svg>
);

export const TriangleShape: React.FC<ShapeProps> = ({ color, className, style }) => (
  <svg viewBox="0 0 100 87" className={className} style={{ fill: COLOR_MAP[color], ...style }}>
    <path d="M50,0 L100,87 L0,87 Z" />
  </svg>
);

export const ShapeRenderer: React.FC<{ type: string } & ShapeProps> = ({ type, ...props }) => {
  switch (type) {
    case 'arch': return <ArchShape {...props} />;
    case 'pillar': return <PillarShape {...props} />;
    case 'platform': return <PlatformShape {...props} />;
    case 'triangle': return <TriangleShape {...props} />;
    default: return <div style={{ width: 50, height: 50, background: 'gray' }} />;
  }
};