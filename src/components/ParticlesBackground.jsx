import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
<Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: '#39FF14' }, // neon green
      shape: {
        type: 'char',
        character: [
          { value: '{', font: 'Courier New', weight: 'bold' },
          { value: '}', font: 'Courier New', weight: 'bold' },
          { value: '</>', font: 'Courier New' },
          { value: 'const', font: 'Courier New' },
        ],
      },
      opacity: {
        value: 0.3,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.02,
          sync: false,
        },
      },
      size: { value: 14 },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'bottom',
        straight: true,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 100,
          duration: 8,
          opacity: 0.4,
          size: 18,
        },
      },
    },
    detectRetina: true,
  }}
/>

  );
}
