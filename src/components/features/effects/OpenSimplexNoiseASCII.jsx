import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Open Simplex Noise ASCII Effect Component
 * 
 * Creates an animated ASCII noise field using simplex noise algorithm
 * Inspired by generative ASCII art techniques
 */

// Improved Simplex Noise implementation
class SimplexNoise {
  constructor(seed = Date.now()) {
    // Permutation table
    this.p = new Uint8Array(512);
    this.perm = new Uint8Array(512);
    
    // Initialize with default permutation
    const defaultPerm = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
      247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
      57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
      74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
      60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
      65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
      200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
      52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
      207, 110, 180, 144, 199, 41, 128, 138, 176, 157, 250, 228, 127, 219, 53, 223,
      170, 162, 192, 129, 156, 121, 97, 84, 71, 14, 155, 107, 58, 253, 152, 2,
      44, 189, 16, 51, 227, 141, 115, 182, 22, 172, 185, 39, 113, 213, 4, 154,
      47, 205, 221, 204, 104, 33, 106, 214, 19, 114, 61, 70, 66, 191, 163, 249,
      81, 224, 210, 183, 46, 93, 195, 101, 206, 96, 67, 150, 45, 48, 167, 98
    ];
    
    // Seed the permutation table
    const random = this.seededRandom(seed);
    const shuffled = [...defaultPerm].sort(() => random() - 0.5);
    
    // Fill permutation arrays
    for (let i = 0; i < 256; i++) {
      this.p[i] = shuffled[i];
      this.p[i + 256] = shuffled[i];
      this.perm[i] = this.p[i] % 12;
      this.perm[i + 256] = this.p[i] % 12;
    }
  }
  
  seededRandom(seed) {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
  
  grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ];
  
  dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }
  
  noise2D(xin, yin) {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    
    let n0, n1, n2;
    
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    
    let i1, j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;
    
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.perm[ii + this.p[jj]];
    const gi1 = this.perm[ii + i1 + this.p[jj + j1]];
    const gi2 = this.perm[ii + 1 + this.p[jj + 1]];
    
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0.0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
    }
    
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0.0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
    }
    
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0.0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
    }
    
    return 70.0 * (n0 + n1 + n2);
  }
}

const OpenSimplexNoiseASCII = ({
  width = 80,
  height = 40,
  scale = 0.1,
  timeScale = 0.001,
  animationSpeed = 1,
  asciiChars = ' ·-=+*#%@',
  seed = 12345,
  colorMode = 'monochrome',
  backgroundColor = '#000000',
  foregroundColor = '#00ff00',
  fontSize = 12,
  letterSpacing = 0,
  lineHeight = 1.2,
  hoverEffect = 'ripple', // 'ripple', 'distort', 'zoom', 'freeze', 'speedup', 'invert', 'none'
  hoverIntensity = 1.0,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);
  const noiseRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1, isOver: false });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    noiseRef.current = new SimplexNoise(seed);
  }, [seed]);

  const getAsciiChar = useCallback((value) => {
    const normalized = (value + 1) / 2;
    const index = Math.floor(normalized * (asciiChars.length - 1));
    return asciiChars[Math.max(0, Math.min(index, asciiChars.length - 1))];
  }, [asciiChars]);

  const getColor = useCallback((value, x, y) => {
    if (colorMode === 'monochrome') {
      return foregroundColor;
    } else if (colorMode === 'gradient') {
      const normalized = (value + 1) / 2;
      const r = Math.floor(normalized * 255);
      const g = Math.floor((1 - normalized) * 255);
      return `rgb(${r}, ${g}, 100)`;
    } else if (colorMode === 'rainbow') {
      const hue = ((value + 1) / 2 + timeRef.current * 0.0001) % 1;
      return `hsl(${hue * 360}, 70%, 60%)`;
    }
    return foregroundColor;
  }, [colorMode, foregroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !noiseRef.current) return;

    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    const charWidth = ctx.measureText('M').width + letterSpacing;
    const charHeight = fontSize * lineHeight;

    canvas.width = width * charWidth;
    canvas.height = height * charHeight;

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = Math.floor((e.clientX - rect.left) / charWidth);
      mouseRef.current.y = Math.floor((e.clientY - rect.top) / charHeight);
      mouseRef.current.isOver = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isOver = false;
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // Apply hover effect to animation speed
      let currentSpeed = animationSpeed;
      if (mouseRef.current.isOver && hoverEffect === 'speedup') {
        currentSpeed *= (2 + hoverIntensity);
      } else if (mouseRef.current.isOver && hoverEffect === 'freeze') {
        currentSpeed = 0;
      }

      if (!isPaused) {
        timeRef.current += timeScale * currentSpeed;
      }

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let noiseX = x * scale;
          let noiseY = y * scale + timeRef.current;

          // Apply hover effects
          if (mouseRef.current.isOver && hoverEffect !== 'none') {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 15 * hoverIntensity;

            if (distance < maxDistance) {
              const influence = 1 - (distance / maxDistance);

              if (hoverEffect === 'ripple') {
                const ripple = Math.sin(distance * 0.5 - timeRef.current * 5) * influence * 0.3 * hoverIntensity;
                noiseX += ripple;
                noiseY += ripple;
              } else if (hoverEffect === 'distort') {
                noiseX += (dx / distance) * influence * 0.5 * hoverIntensity;
                noiseY += (dy / distance) * influence * 0.5 * hoverIntensity;
              } else if (hoverEffect === 'zoom') {
                const zoomFactor = 1 + influence * 2 * hoverIntensity;
                noiseX = mouseRef.current.x * scale + (x - mouseRef.current.x) * scale * zoomFactor;
                noiseY = mouseRef.current.y * scale + (y - mouseRef.current.y) * scale * zoomFactor + timeRef.current;
              }
            }
          }

          let noiseValue = noiseRef.current.noise2D(noiseX, noiseY);

          // Invert effect
          if (mouseRef.current.isOver && hoverEffect === 'invert') {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 15 * hoverIntensity;
            if (distance < maxDistance) {
              const influence = 1 - (distance / maxDistance);
              noiseValue = noiseValue * (1 - 2 * influence);
            }
          }

          const char = getAsciiChar(noiseValue);
          const color = getColor(noiseValue, x, y);

          ctx.fillStyle = color;
          ctx.fillText(char, x * charWidth, y * charHeight);
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, scale, timeScale, animationSpeed, getAsciiChar, getColor, asciiChars, colorMode,
      backgroundColor, foregroundColor, fontSize, letterSpacing, lineHeight, isPaused, hoverEffect, hoverIntensity]);

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className={`opensimplex-noise-ascii ${className}`} style={style}>
      <canvas 
        ref={canvasRef}
        style={{
          display: 'block',
          imageRendering: 'pixelated',
          width: '100%',
          height: '100%',
          cursor: hoverEffect !== 'none' ? 'crosshair' : 'default'
        }}
      />
      <button 
        onClick={togglePause}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          background: '#333',
          color: '#0f0',
          border: '1px solid #0f0',
          cursor: 'pointer',
          fontFamily: 'monospace'
        }}
      >
        {isPaused ? '▶ Play' : '⏸ Pause'}
      </button>
    </div>
  );
};

OpenSimplexNoiseASCII.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
  timeScale: PropTypes.number,
  animationSpeed: PropTypes.number,
  asciiChars: PropTypes.string,
  seed: PropTypes.number,
  colorMode: PropTypes.oneOf(['monochrome', 'gradient', 'rainbow']),
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  hoverEffect: PropTypes.oneOf(['ripple', 'distort', 'zoom', 'freeze', 'speedup', 'invert', 'none']),
  hoverIntensity: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

export default OpenSimplexNoiseASCII;
