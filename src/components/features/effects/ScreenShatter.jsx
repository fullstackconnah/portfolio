import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import '../../../css/screenShatter.css';

export default function CanvasScreenShatter({ onComplete }) {
  useEffect(() => {
    const viewport = document.documentElement;
    html2canvas(viewport, {
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollY: window.scrollY,
    }).then((canvas) => {
      const shardCount = 20;
      const shardWidth = canvas.width / shardCount;
      const shards = [];

      const container = document.createElement('div');
      container.className = 'shatter-canvas-container';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.zIndex = '9998';
      container.style.pointerEvents = 'none';
      container.style.overflow = 'hidden';
      container.style.backgroundColor = 'black';
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';

      const bgOverlay = document.createElement('div');
      bgOverlay.style.position = 'absolute';
      bgOverlay.style.top = '0';
      bgOverlay.style.left = '0';
      bgOverlay.style.width = '100%';
      bgOverlay.style.height = '100%';
      bgOverlay.style.backgroundColor = 'black';
      bgOverlay.style.zIndex = '9997';
      container.appendChild(bgOverlay);

      document.body.appendChild(container);

      for (let i = 0; i < shardCount; i++) {
        const c = document.createElement('canvas');
        c.width = shardWidth;
        c.height = canvas.height;

        const ctx = c.getContext('2d');
        ctx.drawImage(
          canvas,
          i * shardWidth,
          0,
          shardWidth,
          canvas.height,
          0,
          0,
          shardWidth,
          canvas.height
        );

        c.style.position = 'absolute';
        c.style.top = '0';
        c.style.left = `${(i * 100) / shardCount}%`;
        c.style.width = `${100 / shardCount}%`;
        c.style.height = '100%';
        c.style.transition = `transform 2s ease-out ${(i * 40)}ms, opacity 2s ease-out ${(i * 40)}ms`;
        c.style.zIndex = 9999;
        c.style.transform = 'translateY(0)';
        container.appendChild(c);
        shards.push(c);
      }

      setTimeout(() => {
        shards.forEach((c, i) => {
          c.style.transform = `translateY(120vh) rotate(${(Math.random() - 0.5) * 20}deg)`;
          c.style.opacity = '0';
        });
      }, 600);

      setTimeout(() => {
        container.remove();
        if (onComplete) onComplete();
      }, 5000);
    });
  }, [onComplete]);

  return null;
}