import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState('default'); // 'leaf', 'cup', 'pointer'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Track hovered elements
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, select, textarea');
      if (target) {
        setIsHovered(true);
        const customType = target.getAttribute('data-cursor') || 'pointer';
        setHoverType(customType);
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center mustard dot */}
      <div
        className="fixed pointer-events-none z-[10001] transition-transform duration-75 ease-out will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0 : 1})`,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-mustard shadow-gold-glow" />
      </div>

      {/* Outer follow ring or icon */}
      <div
        className={`fixed pointer-events-none z-[10000] flex items-center justify-center transition-all duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-10 h-10 border-2 border-olive bg-cream-100/90 text-olive shadow-warm-md scale-110'
            : 'w-8 h-8 border border-mustard/60 bg-mustard/10 scale-100'
        } rounded-full`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {isHovered && hoverType === 'cup' && (
          <span className="text-xs">☕</span>
        )}
        {isHovered && hoverType === 'leaf' && (
          <span className="text-xs">🌿</span>
        )}
        {isHovered && hoverType !== 'cup' && hoverType !== 'leaf' && (
          <div className="w-1.5 h-1.5 rounded-full bg-olive animate-ping" />
        )}
      </div>
    </>
  );
}
