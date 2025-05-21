import React, { useEffect, useRef, useState } from 'react';
import '../css/asciiEffects.css';

export default function AsciiTitleGlitch({ asciiArt }) {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(16); // start at 16px

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      if (!container) return;
  
      const parentWidth = container.parentElement.offsetWidth;
      let size = 16.0;
  
      container.style.fontSize = `${size}px`;
  
      while (container.scrollWidth > parentWidth && size > 4) {
        size -= 2;
        container.style.fontSize = `${size}px`;
      }
  
      setFontSize(size);
    };
  
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [asciiArt]);

  return (
    <pre
        ref={containerRef}
        className="ascii-logo font-mono text-[#39FF14] leading-none whitespace-pre text-center sm:text-left animate-glitch px-2"
        style={{
            fontSize: `${fontSize}px`,
            overflow: 'hidden',
            minWidth: '100%',
            boxSizing: 'border-box',
        }}
        >
        {asciiArt.join('\n')}
    </pre>
  );
}