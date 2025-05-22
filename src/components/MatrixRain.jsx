import { useEffect, useRef, useState } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef();
  const overlayRef = useRef();
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 }); // offscreen init

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01<>[]{}/=+constfunction$'.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * canvas.height / fontSize)
    );

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF14';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full blur-[2px]"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-80"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mouse.x}px ${mouse.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mouse.x}px ${mouse.y}px, transparent 0%, black 100%)`,
          transition: 'mask-image 0.05s, -webkit-mask-image 0.05s',
        }}
      />
    </div>
  );
}
