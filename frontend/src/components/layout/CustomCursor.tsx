'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile === undefined || isMobile) {
    return null;
  }
  
  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-accent transition-transform duration-200 -translate-x-1/2 -translate-y-1/2',
          isHovering ? 'opacity-100' : 'opacity-0',
          isPointer && 'scale-[4] border-2 border-accent bg-accent/20'
        )}
        style={cursorStyle}
      />
      <div
        className={cn(
          'pointer-events-none fixed z-[9998] transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2',
          isHovering ? 'opacity-100' : 'opacity-0'
        )}
        style={cursorStyle}
      >
        <div
          className="h-[600px] w-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(var(--primary) / 0.15) 0%, hsla(var(--primary) / 0) 70%)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
