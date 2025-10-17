import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OpenSimplexNoiseASCII from '../components/features/effects/OpenSimplexNoiseASCII';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404');
  const [errorMessages] = useState([
    'SYSTEM CORE BREACH DETECTED',
    'MEMORY ADDRESS NOT FOUND',
    'CRITICAL PATH FAILURE',
    'PAGE DOES NOT EXIST',
    'ROUTING TABLE CORRUPTED'
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchChars = '404@#$%ERR0R';
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = '404'.split('').map(char => 
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText('404'), 100);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Rotate error messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % errorMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [errorMessages.length]);

  return (
    <div className="relative h-screen w-screen bg-black text-[#39FF14] font-mono overflow-hidden">
      {/* Black base layer - blocks all background effects */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }} />
      
      {/* ASCII Noise Effect Layer */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <OpenSimplexNoiseASCII
          width={150}
          height={80}
          scale={0.02}
          timeScale={0.0005}
          animationSpeed={0.5}
          asciiChars="ERROR404#@%*!█▓▒░"
          seed={404}
          colorMode="gradient"
          backgroundColor="#000000"
          foregroundColor="#ff0000"
          fontSize={16}
          letterSpacing={0}
          lineHeight={0.8}
          hoverEffect="distort"
          hoverIntensity={2.5}
          style={{
            opacity: 0.3
          }}
        />
      </div>

      {/* Vignette effect */}
      <div 
        className="fixed inset-0"
        style={{
          zIndex: 2,
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Content Layer */}
      <div className="relative flex flex-col items-center justify-center h-full px-6" style={{ zIndex: 10 }}>
        {/* Main 404 Display */}
        <div className="text-center space-y-8 max-w-2xl">
          {/* Giant 404 */}
          <div className="relative">
            <h1 
              className="text-[150px] sm:text-[200px] font-bold leading-none tracking-wider"
              style={{
                textShadow: `
                  0 0 10px rgba(255, 0, 0, 0.8),
                  0 0 20px rgba(255, 0, 0, 0.6),
                  0 0 30px rgba(255, 0, 0, 0.4),
                  2px 2px 0px rgba(57, 255, 20, 0.3)
                `
              }}
            >
              {glitchText}
            </h1>
            {/* Chromatic aberration clone */}
            <h1 
              className="absolute top-0 left-0 w-full text-[150px] sm:text-[200px] font-bold leading-none tracking-wider opacity-30"
              style={{
                color: '#39FF14',
                transform: 'translate(3px, 3px)',
                zIndex: -1
              }}
              aria-hidden="true"
            >
              404
            </h1>
          </div>

          {/* System Fault Box */}
          <div className="border-2 border-[#ff0000] bg-black/80 p-6 backdrop-blur-sm relative overflow-hidden">
            {/* Scanline effect */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)'
              }}
            />
            
            <div className="relative space-y-4">
              <h2 className="text-2xl font-bold text-[#ff0000] tracking-wider animate-pulse">
                [ SYSTEM FAULT ]
              </h2>
              
              <p className="text-[#ff0000]/80 text-sm font-mono h-6 transition-opacity duration-500">
                {errorMessages[currentMessage]}
              </p>
              
              <div className="border-t border-[#ff0000]/30 pt-4 mt-4">
                <p className="text-[#39FF14]/70 text-sm mb-2">
                  The requested resource could not be located.
                </p>
                <p className="text-[#39FF14]/50 text-xs">
                  Try <span className="text-[#39FF14]">cd /</span> or execute reboot sequence.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              to="/" 
              className="group relative px-8 py-4 border-2 border-[#39FF14] bg-black hover:bg-[#39FF14] text-[#39FF14] hover:text-black transition-all duration-300 font-bold text-sm tracking-wider overflow-hidden"
            >
              <span className="relative z-10">&gt; REBOOT SYSTEM</span>
              <div className="absolute inset-0 bg-[#39FF14] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="group relative px-8 py-4 border-2 border-[#ff0000]/50 bg-black hover:bg-[#ff0000]/10 text-[#ff0000] transition-all duration-300 font-bold text-sm tracking-wider"
            >
              &gt; GO BACK
            </button>
          </div>

          {/* System Info Footer */}
          <div className="pt-8 text-xs text-[#39FF14]/30 font-mono space-y-1">
            <p>ERROR_CODE: 0x404_NOT_FOUND</p>
            <p>TIMESTAMP: {new Date().toISOString()}</p>
            <p>LOCATION: {window.location.pathname}</p>
            <p className="animate-pulse text-[#ff0000]/50">SYSTEM_STATUS: CRITICAL</p>
          </div>
        </div>
      </div>

      {/* Corner glitch effects */}
      <div className="fixed top-4 left-4 text-[#ff0000]/20 text-xs font-mono" style={{ zIndex: 5 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i}>{'>'} ERR_{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</p>
        ))}
      </div>
    </div>
  );
}
