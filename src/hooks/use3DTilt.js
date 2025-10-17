import { useEffect, useRef, useState } from 'react';


export function use3DTilt(options = {}) {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glareOpacity = 0.1,
    reset = true
  } = options;

  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrameId = null;
    let isHovering = false;

    const handleMouseMove = (e) => {
      if (!isHovering) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
        });

        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(57, 255, 20, ${glareOpacity}), transparent 50%)`,
          opacity: 1
        });
      });
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;

      if (reset) {
        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
          transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
        });
        setGlareStyle({
          opacity: 0,
          transition: `opacity ${speed}ms ease`
        });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed, glareOpacity, reset]);

  return [ref, tiltStyle, glareStyle];
}
