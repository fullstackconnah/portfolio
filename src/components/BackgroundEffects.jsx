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
  
    const draw3DGrid = (ctx, width, height, time) => {
      ctx.lineWidth = 1;

      const horizonY = height * 0.4;
      const bottomY = height;

      const speedY = -20;
      const speedX = 10;

      const offsetY = time * speedY * 0.001;
      const offsetX = time * speedX * 0.001;

      const spread = 3.0;
      const spacingX = 100;

      const maxWorldX = (width / 2) / spread + spacingX;

      const cameraX = offsetX;

      const minIndex = Math.floor((cameraX - maxWorldX) / spacingX);
      const maxIndex = Math.ceil((cameraX + maxWorldX) / spacingX);

      for (let i = minIndex; i <= maxIndex; i++) {
        const worldX = i * spacingX - cameraX;

        const horizonX = width / 2 + worldX;

        const dx = horizonX - width / 2;
        const bottomX = width / 2 + dx * spread;

        const centerFade = 1 - Math.min(Math.abs(dx) / (width * 0.5), 1);

        const grad = ctx.createLinearGradient(horizonX, horizonY, bottomX, bottomY);
        grad.addColorStop(0.0, `rgba(0, 255, 0, 0.0)`);
        grad.addColorStop(0.05, `rgba(0, 255, 0, ${0.02 * centerFade})`);
        grad.addColorStop(0.2, `rgba(0, 255, 0, ${0.1 * centerFade})`);
        grad.addColorStop(1.0, `rgba(0, 255, 0, ${0.5 * centerFade})`);

        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(horizonX, horizonY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
      }

      const baseSpacing = 100;
      const fov = 360;

      let z0 = offsetY % baseSpacing;
      if (z0 < 0) z0 += baseSpacing;

      let z = z0;
      let safety = 0;

      while (true) {
        const scale = fov / (fov + z);
        const y = horizonY + scale * (bottomY - horizonY);

        const fade = (y - horizonY) / (bottomY - horizonY);
        const smoothFade = fade ** 2; 
        ctx.strokeStyle = `rgba(0, 255, 0, ${smoothFade * 0.5})`;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        z += baseSpacing;
        safety++;
        if (safety > 500) break;
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
      if (frame % 1000 === 0) {
        ctx.save();
        ctx.translate(Math.random() * 2 - 1, Math.random() * 2 - 1);
        // draw grid again if needed
        ctx.restore();
      }
    };
  
   const draw = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, width, height);

      if (frame % 4 === 0) {
        draw3DGrid(ctx, width, height, time);
      }

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