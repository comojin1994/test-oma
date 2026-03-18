import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface Props {
  isMobile: boolean;
}

export function ParticleBackground({ isMobile }: Props) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInitialized(true));
  }, []);

  if (!initialized) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      options={{
        background: { color: 'transparent' },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.5 } },
            push: { quantity: 2 },
          },
        },
        particles: {
          color: { value: ['#6366f1', '#a855f7', '#06b6d4'] },
          links: {
            color: '#6366f1',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
          },
          number: {
            density: { enable: true },
            value: isMobile ? 30 : 80,
          },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
