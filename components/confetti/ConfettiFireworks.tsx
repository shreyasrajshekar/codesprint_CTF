'use client';

import confetti from 'canvas-confetti';

interface ConfettiFireworksProps {
  duration?: number; // in milliseconds, default 5000
  particleCount?: number; // default 50
  onComplete?: () => void;
}

export function useConfettiFireworks() {
  const fire = ({
    duration = 5000,
    particleCount = 50,
    onComplete,
  }: ConfettiFireworksProps = {}) => {
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const particles = particleCount * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount: particles,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount: particles,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return { fire };
}

interface FireworksButtonProps {
  children: React.ReactNode;
  duration?: number;
  particleCount?: number;
  className?: string;
  onComplete?: () => void;
}

export function ConfettiFireworksButton({
  children,
  duration = 5000,
  particleCount = 50,
  className = '',
  onComplete,
}: FireworksButtonProps) {
  const { fire } = useConfettiFireworks();

  const handleClick = () => {
    fire({ duration, particleCount, onComplete });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}