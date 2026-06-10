import React from 'react';

interface ShapeProps {
  className?: string;
}

// Shape 1: Geometric Clover/Flower Cross
export const ShapeClover: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
  </svg>
);

// Shape 2: Double Wave Circles
export const ShapeWave: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" />
  </svg>
);

// Shape 10: Geometric Hook/Star
export const ShapeHookStar: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 192 L 128 192 L 128 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 128 L 64 128 Z M 192 192 L 256 192 L 256 256 L 192 256 C 156.654 256 128 227.346 128 192 L 128 128 L 192 128 Z M 64 64 L 128 64 L 128 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 128 L 192 128 L 192 64 L 128 64 L 128 128 L 64 128 C 28.654 128 0 99.346 0 64 L 0 0 L 64 0 Z" />
  </svg>
);

// Shape 11: Square Diamond Grid
export const ShapeGrid: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
  </svg>
);

// Shape 18: Abstract Interlocking Rings
export const ShapeAbstractRings: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 192 C 64 227.346 35.346 256 0 256 L 0 192 C 0 156.654 28.654 128 64 128 Z M 128 128 C 163.346 128 192 156.654 192 192 L 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 L 64 192 C 64 156.654 92.654 128 128 128 Z M 192 128 C 227.346 128 256 156.654 256 192 L 256 256 C 220.654 256 192 227.346 192 192 Z M 0 0 C 35.346 0 64 28.654 64 64 L 64 128 C 28.654 128 0 99.346 0 64 Z M 192 64 C 192 99.346 163.346 128 128 128 C 92.654 128 64 99.346 64 64 L 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 256 64 C 256 99.346 227.346 128 192 128 L 192 64 C 192 28.654 220.654 0 256 0 Z" />
  </svg>
);

// Shape 24: Concentric Circles Target
export const ShapeBullseye: React.FC<ShapeProps> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 32 C 74.98 32 32 74.98 32 128 C 32 181.019 74.98 224 128 224 C 181.019 224 224 181.019 224 128 C 224 74.98 181.019 32 128 32 Z M 128 56 C 167.765 56 200 88.236 200 128 C 200 167.765 167.765 200 128 200 C 88.236 200 56 167.765 56 128 C 56 88.236 88.236 56 128 56 Z M 128 88 C 105.909 88 88 105.909 88 128 C 88 150.091 105.909 168 128 168 C 150.091 168 168 150.091 168 128 C 168 105.909 150.091 88 128 88 Z M 128 112 C 136.837 112 144 119.163 144 128 C 144 136.837 136.837 144 128 144 C 119.163 144 112 136.837 112 128 C 112 119.163 119.163 112 128 112 Z" />
  </svg>
);
