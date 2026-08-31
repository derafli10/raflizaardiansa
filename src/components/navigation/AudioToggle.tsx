'use client';

import { forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '@/stores/audio-store';
import { useMagneticElement } from '@/hooks/useMagneticElement';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface AudioToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * AudioToggle — Hardware Sound & Ambient Audio Controller.
 *
 * Toggles global audio state (mute/unmute) with visual signal LED and soundwave indicator.
 * Integrated with Zustand audio-store.
 *
 * **Requirements: 17.1**
 */
export const AudioToggle = forwardRef<HTMLButtonElement, AudioToggleProps>(
  ({ className, ...props }, ref) => {
    const isMuted = useAudioStore((state) => state.isMuted);
    const toggleMute = useAudioStore((state) => state.toggleMute);
    const prefersReducedMotion = useReducedMotion();

    const magneticRef = useMagneticElement<HTMLButtonElement>({
      strength: !prefersReducedMotion ? 0.3 : 0,
      radius: 50,
    });

    return (
      <button
        ref={(el) => {
          (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute audio signals' : 'Mute audio signals'}
        title={isMuted ? 'Audio muted' : 'Audio enabled'}
        className={cn(
          'group border-trace bg-substrate-raised relative flex h-9 w-9 items-center justify-center rounded-lg border',
          'text-text-secondary hover:text-copper hover:border-copper/70 transition-all duration-200',
          'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {isMuted ? (
          <VolumeX className="text-text-tertiary h-4 w-4" />
        ) : (
          <Volume2 className="text-copper-bright h-4 w-4" />
        )}

        {/* LED Signal Status Dot */}
        <span
          className={cn(
            'border-substrate absolute -top-1 -right-1 h-2 w-2 rounded-full border transition-colors duration-200',
            isMuted ? 'bg-signal-red/80' : 'bg-signal-green shadow-signal-glow animate-pulse'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

AudioToggle.displayName = 'AudioToggle';
