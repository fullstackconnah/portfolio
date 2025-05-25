import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frame = 0;
  
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
  
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
  
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
  
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)';
      for (let x = 0; x < width; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 120) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };
  
    const drawCRTScanline = (time) => {
      const waveHeight = 60;
      const scrollSpeed = 0.05;
      const offsetY = (time * scrollSpeed) % height;
  
      const gradient = ctx.createLinearGradient(0, offsetY, 0, offsetY + waveHeight);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
      gradient.addColorStop(0.3, 'rgba(0, 255, 0, 0.04)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, offsetY, width, waveHeight);
  
      ctx.fillStyle = 'rgba(0, 255, 0, 0.02)';
      for (let y = 0; y < height; y += 2) {
        ctx.fillRect(0, y, width, 1);
      }
    };
  
    const drawCursorEffect = (time) => {
      const { x, y } = mouseRef.current;
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.002);
      const startColor = [0, 255, 100];
      const endColor = [0, 180, 60];
      const r = startColor[0] + (endColor[0] - startColor[0]) * pulse;
      const g = startColor[1] + (endColor[1] - startColor[1]) * pulse;
      const b = startColor[2] + (endColor[2] - startColor[2]) * pulse;
  
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
      gradient.addColorStop(0, `rgba(${r},${g},${b},0.2)`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };
  
    const drawGlitch = () => {
      if (frame % 300 === 0) {
        const glitchHeight = 4;
        for (let i = 0; i < 5; i++) {
          const y = Math.random() * height;
          const imageData = ctx.getImageData(0, y, width, glitchHeight);
          const xOffset = Math.random() * 20 - 10;
          ctx.putImageData(imageData, xOffset, y);
        }
      }
    };
  
    const draw = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, width, height);
  
      if (frame % 4 === 0) drawGrid();
      drawCRTScanline(time);
      drawCursorEffect(time);
      drawGlitch();
  
      frame++;
    };
  
    const render = (time) => {
      draw(time);
      animationFrameId = requestAnimationFrame(render);
    };
  
    render(0);
  
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: 'black'
      }}
    />
  );
}