import '@testing-library/jest-dom';

// Mock tsparticles — canvas/WebGL APIs aren't available in jsdom
vi.mock('@tsparticles/react', () => ({
  Particles: () => null,
  initParticlesEngine: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn().mockResolvedValue(undefined),
}));

// Polyfill IntersectionObserver — framer-motion viewport features require it
globalThis.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
