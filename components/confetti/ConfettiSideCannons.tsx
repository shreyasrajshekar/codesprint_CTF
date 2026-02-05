'use client';

import confetti from 'canvas-confetti';

interface ConfettiSideCannonsProps {
  duration?: number; // in milliseconds, default 3000
  colors?: string[];
  particleCount?: number;
  onComplete?: () => void;
}

export function useConfettiSideCannons() {
  const fire = ({
    duration = 3000,
    colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'],
    particleCount = 2,
    onComplete,
  }: ConfettiSideCannonsProps = {}) => {
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) {
        onComplete?.();
        return;
      }

      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return { fire };
}

interface SideCannonsButtonProps {
  children: React.ReactNode;
  duration?: number;
  colors?: string[];
  particleCount?: number;
  className?: string;
  onComplete?: () => void;
}

export function ConfettiSideCannonsButton({
  children,
  duration = 3000,
  colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'],
  particleCount = 2,
  className = '',
  onComplete,
}: SideCannonsButtonProps) {
  const { fire } = useConfettiSideCannons();

  const handleClick = () => {
    fire({ duration, colors, particleCount, onComplete });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}