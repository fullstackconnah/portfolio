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
            fullScreen: { enable: true, zIndex: -1 },
            background: { color: { value: 'transparent' } },
            particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: '#ffffff' },
            opacity: { value: 0.08, random: true },
            size: { value: 2, random: true },
            move: {
                enable: true,
                speed: 0.3,
                direction: 'none',
                outModes: { default: 'out' },
            },
            },
            detectRetina: true,
        }}
/>

  );
}