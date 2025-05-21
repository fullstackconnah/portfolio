import React from 'react';
import '../css/asciiEffects.css';

export default function AsciiTitle({ asciiArt }) {
  return (
    <pre className="text-[10px] sm:text-sm md:text-base font-mono text-[#39FF14] leading-none whitespace-pre text-center sm:text-left overflow-hidden sm:overflow-x-auto animate-glitch">
    {asciiArt.join('\n')}
    </pre>
  );
}