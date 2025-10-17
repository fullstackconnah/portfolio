import { useEffect, useState, useRef } from 'react';
import '../../../css/bootSequence.css';
import { ASCII_STANDARD } from '../../../data/asciiArtVariants.js';

// ASCII Art Header for CONNAHDOS
const asciiHeader = `
 ██████╗ ██████╗ ███╗   ██╗███╗   ██╗ █████╗ ██╗  ██╗██████╗  ██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔══██╗██║  ██║██╔══██╗██╔═══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║███████║███████║██║  ██║██║   ██║███████╗
██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══██║██╔══██║██║  ██║██║   ██║╚════██║
╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║██║  ██║██║  ██║██████╔╝╚██████╔╝███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝                                                                           
`;

const biosSequence = [
  { text: asciiHeader, className: 'ascii-cyberpunk leading-tight text-[10px] sm:text-xs', delay: 500, isAscii: true },
  { text: '', className: '', delay: 200 },
  { text: 'CONNAHDOS™ BIOS v2.025 | Award Modular BIOS Extension', className: 'text-white', delay: 100 },
  { text: 'Copyright (C) 2025, Connah Trotman Software, Inc.', className: 'text-gray-400', delay: 50 },
  { text: '', className: '', delay: 100 },
  { text: 'Build: PERSONAL-PORTFOLIO-X64', className: 'text-[#39FF14]', delay: 200 },
  { text: '', className: '', delay: 50 },
  { text: 'Main Processor : Intel(R) Core(TM) Developer Edition', className: '', delay: 100 },
  { text: 'Memory Test : ', className: '', delay: 50, memoryTest: true },
  { text: '', className: '', delay: 300 },
  { text: 'Award Plug and Play BIOS Extension v1.0A', className: '', delay: 100 },
  { text: 'Copyright (C) 1997, Award Software, Inc.', className: 'text-gray-400', delay: 50 },
  { text: '', className: '', delay: 100 },
  
  // Hardware detection
  { text: 'Detecting IDE Primary Master  ... [React v18.3.1]', className: '', delay: 150 },
  { text: 'Detecting IDE Primary Slave   ... [Firebase v10.x]', className: '', delay: 150 },
  { text: 'Detecting IDE Secondary Master... [TailwindCSS v3.x]', className: '', delay: 150 },
  { text: 'Detecting IDE Secondary Slave ... [Node.js Backend]', className: '', delay: 150 },
  { text: '', className: '', delay: 200 },
  
  // System checks
  { text: 'Initializing Portfolio Modules... OK', className: 'text-[#39FF14]', delay: 200 },
  { text: 'Loading Project Database...       OK', className: 'text-[#39FF14]', delay: 150 },
  { text: 'Mounting File Systems...          OK', className: 'text-[#39FF14]', delay: 150 },
  { text: 'Verifying Developer Profile...    ', className: '', delay: 100, status: 'fail' },
  { text: 'Reattempting authentication...    ', className: 'text-yellow-400', delay: 800 },
  { text: 'Verifying Developer Profile...    OK', className: 'text-[#39FF14]', delay: 200 },
  { text: '', className: '', delay: 100 },
  { text: 'Starting Network Services...      OK', className: 'text-[#39FF14]', delay: 150 },
  { text: 'Loading User Interface...         OK', className: 'text-[#39FF14]', delay: 150 },
  { text: '', className: '', delay: 200 },
  { text: 'Press DEL to enter SETUP', className: 'text-gray-500 text-xs', delay: 100 },
  { text: '', className: '', delay: 300 },
  { text: 'Booting from Hard Disk...', className: 'text-white', delay: 500 },
];

export default function EnhancedBootSplash({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [memoryCount, setMemoryCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const currentIndex = useRef(0);
  const memoryTarget = 32768; // KB

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Memory test animation
  const animateMemoryTest = (callback) => {
    let count = 0;
    const increment = 2048;
    const interval = setInterval(() => {
      count += increment;
      if (count >= memoryTarget) {
        count = memoryTarget;
        clearInterval(interval);
        setTimeout(callback, 300);
      }
      setMemoryCount(count);
    }, 30);
  };

  useEffect(() => {
    const processNextLine = () => {
      if (currentIndex.current >= biosSequence.length) {
        setTimeout(onFinish, 800);
        return;
      }

      const currentLine = biosSequence[currentIndex.current];

      // Special handling for memory test line
      if (currentLine.memoryTest) {
        setLines(prev => [...prev, { ...currentLine, text: 'Memory Test : ' }]);
        currentIndex.current++;
        
        animateMemoryTest(() => {
          processNextLine();
        });
        return;
      }

      // Special handling for failed status
      if (currentLine.status === 'fail') {
        setLines(prev => [...prev, { ...currentLine, text: currentLine.text + 'FAILED', className: 'text-red-500' }]);
        currentIndex.current++;
        setTimeout(processNextLine, currentLine.delay);
        return;
      }

      // Normal line processing
      setLines(prev => [...prev, currentLine]);
      currentIndex.current++;
      setTimeout(processNextLine, currentLine.delay);
    };

    processNextLine();
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black text-gray-300 font-mono z-[9999] overflow-hidden">
      {/* BIOS-style content with proper spacing */}
      <div className="p-4 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre font-['Courier_New',monospace] ${line?.className || ''} ${line?.isAscii ? 'select-none' : ''}`}
            style={{ letterSpacing: line?.isAscii ? '0' : '0.05em' }}
          >
            {line?.text || ''}
            {line?.memoryTest && (
              <span className="text-white">
                {memoryCount.toString().padStart(5, ' ')}K OK
              </span>
            )}
          </div>
        ))}
        
        {/* Blinking cursor at current position */}
        {currentIndex.current < biosSequence.length && (
          <span className={`inline-block w-2 h-4 bg-gray-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            {' '}
          </span>
        )}
      </div>

      {/* Bottom status bar - like real BIOS */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-xs p-2 border-t border-gray-600">
        <span className="text-[#39FF14]">CONNAHDOS™</span> BIOS v2.025 | 
        <span className="ml-2">Press <span className="text-yellow-400">DEL</span> to enter SETUP</span>
      </div>

      {/* Scanline effect for authenticity */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-20" />
    </div>
  );
}
