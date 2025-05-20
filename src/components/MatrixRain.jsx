import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01<>[]{}/=+constfunction$'.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * canvas.height / fontSize)
      );
    const draw = () => {
      // Black translucent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF14'; // Neon green
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

    const interval = setInterval(draw, 50);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
    ref={canvasRef}
    className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none blur-[2px]"
    />
  );
}