import React, { useEffect, useRef, useState } from 'react';
import '../../css/asciiEffects.css';

export default function AsciiTitleGlitch({ asciiArt, scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [displayText, setDisplayText] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fadeOutIntervalRef = useRef(null);


  useEffect(() => {
    const fullText = asciiArt.join('\n');
    let progress = 0;

    const scrambleInterval = setInterval(() => {
      if (progress >= 30) {
        setDisplayText(fullText);
        setIsBooting(false);
        clearInterval(scrambleInterval);
        return;
      }

      const revealCount = Math.floor((progress / 30) * fullText.length);
      let scrambled = '';

      for (let i = 0; i < fullText.length; i++) {
        scrambled += i < revealCount || fullText[i] === '\n' || fullText[i] === ' '
          ? fullText[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }

      setDisplayText(scrambled);
      progress++;
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [asciiArt]);


  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      if (!container) return;


      const isMobile = window.innerWidth < 768;
      const baseFontSize = isMobile ? 10.0 : 16.0;
      const minFontSize = isMobile ? 6.0 : 8.0;

      let size;
      if (scrollProgress <= 0.3) {

        size = baseFontSize;
      } else {

        const normalizedProgress = (scrollProgress - 0.3) / 0.7;
        size = baseFontSize - (normalizedProgress * (baseFontSize - minFontSize));
      }

      container.style.fontSize = `${size}px`;
      setFontSize(size);
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [asciiArt, scrollProgress]);

  const [scrambledChars, setScrambledChars] = useState(new Map());
  const scrambledCharsRef = useRef(new Map());
  const cycleIntervalRef = useRef(null);
  const globalMouseListenerRef = useRef(null);

  const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';


  const handleMouseMove = (e) => {
    if (!containerRef.current || isBooting) return;


    if (fadeOutIntervalRef.current) {
      clearInterval(fadeOutIntervalRef.current);
      fadeOutIntervalRef.current = null;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;



    const computedStyle = window.getComputedStyle(containerRef.current);
    const actualLineHeight = parseFloat(computedStyle.lineHeight) || fontSize;




    const tempSpan = document.createElement('span');
    tempSpan.style.font = computedStyle.font;
    tempSpan.style.fontSize = computedStyle.fontSize;
    tempSpan.style.fontFamily = computedStyle.fontFamily;
    tempSpan.textContent = 'M';
    tempSpan.style.position = 'absolute';
    tempSpan.style.visibility = 'hidden';
    document.body.appendChild(tempSpan);
    const charWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);

    const charX = Math.floor(x / charWidth);
    const charY = Math.floor(y / actualLineHeight);

    const lines = displayText.split('\n');
    const scrambleRadius = 3;

    const newScrambled = new Map(scrambledCharsRef.current);
    const activeIndices = new Set();
    const now = Date.now();


    let globalIdx = 0;
    const indexMap = [];

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx];
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        indexMap.push({ lineIdx, charIdx, globalIdx });
        globalIdx++;
      }

      if (lineIdx < lines.length - 1) {
        globalIdx++;
      }
    }


    for (const { lineIdx, charIdx, globalIdx: gIdx } of indexMap) {
      const line = lines[lineIdx];


      const dx = charIdx - charX;
      const dy = lineIdx - charY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= scrambleRadius) {
        activeIndices.add(gIdx);


        if (line[charIdx] !== ' ' && line[charIdx] !== '\n') {

          const intensity = 1.0 - (distance / scrambleRadius);
          const scrambleProbability = 0.3 + (intensity * 0.7);

          if (!newScrambled.has(gIdx) && Math.random() < scrambleProbability) {
            newScrambled.set(gIdx, {
              char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
              intensity,
              timestamp: now
            });
          } else if (newScrambled.has(gIdx)) {

            const existing = newScrambled.get(gIdx);
            newScrambled.set(gIdx, {
              ...existing,
              intensity: intensity
            });
          }
        }
      }
    }


    for (const [idx, data] of newScrambled) {
      if (!activeIndices.has(idx)) {
        const timeSinceScramble = now - data.timestamp;

        if (timeSinceScramble > 200) {
          newScrambled.delete(idx);
        }
      }
    }

    scrambledCharsRef.current = newScrambled;
    setScrambledChars(new Map(newScrambled));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);


    if (!globalMouseListenerRef.current) {
      globalMouseListenerRef.current = handleMouseMove;
      document.addEventListener('mousemove', globalMouseListenerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);


    if (globalMouseListenerRef.current) {
      document.removeEventListener('mousemove', globalMouseListenerRef.current);
      globalMouseListenerRef.current = null;
    }


    if (fadeOutIntervalRef.current) {
      clearInterval(fadeOutIntervalRef.current);
    }

    fadeOutIntervalRef.current = setInterval(() => {
      const currentScrambled = scrambledCharsRef.current;
      if (currentScrambled.size === 0) {
        clearInterval(fadeOutIntervalRef.current);
        fadeOutIntervalRef.current = null;
        return;
      }

      const newScrambled = new Map(currentScrambled);
      const toRemove = [];

      for (const [idx, data] of newScrambled) {
        if (!data.isIdleGlitch) {
          toRemove.push(idx);
        }
      }


      const removeCount = Math.ceil(toRemove.length * 0.3);
      for (let i = 0; i < removeCount && toRemove.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * toRemove.length);
        newScrambled.delete(toRemove[randomIndex]);
        toRemove.splice(randomIndex, 1);
      }

      scrambledCharsRef.current = newScrambled;
      setScrambledChars(new Map(newScrambled));
    }, 50);
  };


  useEffect(() => {
    return () => {
      if (globalMouseListenerRef.current) {
        document.removeEventListener('mousemove', globalMouseListenerRef.current);
      }
      if (fadeOutIntervalRef.current) {
        clearInterval(fadeOutIntervalRef.current);
      }
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (!isHovered) return;

    cycleIntervalRef.current = setInterval(() => {
      const currentScrambled = scrambledCharsRef.current;
      if (currentScrambled.size === 0) return;

      const newScrambled = new Map(currentScrambled);

      for (const [idx, data] of newScrambled) {
        if (Math.random() > 0.6) {
          newScrambled.set(idx, {
            ...data,
            char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          });
        }
      }

      scrambledCharsRef.current = newScrambled;
      setScrambledChars(new Map(newScrambled));
    }, 80);

    return () => clearInterval(cycleIntervalRef.current);
  }, [isHovered]);


  useEffect(() => {
    if (isBooting) return;

    let idleGlitchInterval;
    let glitchTimeoutId;

    idleGlitchInterval = setInterval(() => {
      const glitchCount = Math.floor(Math.random() * 3) + 1;
      const newScrambled = new Map(scrambledCharsRef.current);

      for (let i = 0; i < glitchCount; i++) {
        let randomIdx, attempts = 0;
        do {
          randomIdx = Math.floor(Math.random() * displayText.length);
          attempts++;
        } while ((displayText[randomIdx] === ' ' || displayText[randomIdx] === '\n') && attempts < 20);

        if (displayText[randomIdx] !== ' ' && displayText[randomIdx] !== '\n') {
          newScrambled.set(randomIdx, {
            char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
            intensity: 0.8,
            timestamp: Date.now(),
            isIdleGlitch: true
          });
        }
      }

      scrambledCharsRef.current = newScrambled;
      setScrambledChars(new Map(newScrambled));

      glitchTimeoutId = setTimeout(() => {
        const updatedScrambled = new Map(scrambledCharsRef.current);
        for (const [idx, data] of updatedScrambled) {
          if (data.isIdleGlitch) updatedScrambled.delete(idx);
        }
        scrambledCharsRef.current = updatedScrambled;
        setScrambledChars(new Map(updatedScrambled));
      }, 400 + Math.random() * 400);
    }, 2000 + Math.random() * 3000);

    return () => {
      clearInterval(idleGlitchInterval);
      clearTimeout(glitchTimeoutId);
    };
  }, [isBooting, displayText]);


  const renderScrambledText = () => {
    return displayText.split('').map((char, i) => {
      if (scrambledChars.has(i)) {
        const data = scrambledChars.get(i);
        const brightness = 1.0 + (data.intensity * 0.5);
        const glowIntensity = 5 + (data.intensity * 15);

        return (
          <span
            key={i}
            style={{
              filter: `brightness(${brightness})`,
              textShadow: `0 0 ${glowIntensity}px #39FF14`,
              display: 'inline-block',
              animation: 'scramble-flicker 0.1s infinite'
            }}
          >
            {data.char}
          </span>
        );
      }
      return <span key={i}>{char}</span>;
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ padding: '0' }}
    >
      <pre
        ref={containerRef}
        className="ascii-logo font-mono text-[#39FF14] leading-none whitespace-pre text-left"
        style={{
          fontSize: `${fontSize}px`,
          overflow: 'visible',
          width: '100%',
          boxSizing: 'border-box',
          textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14',
          transition: 'none',
          padding: 0
        }}
      >
        {scrambledChars.size > 0 ? renderScrambledText() : displayText}
        {!isBooting && (
          <span style={{ opacity: showCursor ? 1 : 0 }}>█</span>
        )}
      </pre>
    </div>
  );
}