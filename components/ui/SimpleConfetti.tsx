import React, { useState, useEffect } from 'react';

interface ConfettiProps {
  active: boolean;
}

const SimpleConfetti: React.FC<ConfettiProps> = ({ active }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    if (!active) return;
    
    // Create confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 10,
      color: ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB'][Math.floor(Math.random() * 5)],
      size: 5 + Math.random() * 10,
      rotation: Math.random() * 360,
      opacity: 1,
    }));
    
    setParticles(newParticles);
    
    // Animation loop
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + 2 + Math.random() * 3,
          x: p.x + (Math.random() - 0.5) * 3,
          rotation: p.rotation + Math.random() * 10,
          opacity: p.y > 50 ? p.opacity - 0.03 : p.opacity,
        })).filter(p => p.opacity > 0)
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
    </div>
  );
};

export default SimpleConfetti;