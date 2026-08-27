/**
 * Audio Store (Optional)
 *
 * Manages audio state including mute status, volume control, and ambient sound playback.
 * This store is optional and can be used for background ambient sounds or UI sound effects.
 *
 * @module stores/audio-store
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Audio store state interface
 */
interface AudioState {
  /**
   * Global mute state for all audio
   */
  isMuted: boolean;

  /**
   * Master volume level (0-1)
   * 0 = silent, 1 = full volume
   */
  volume: number;

  /**
   * Ambient background sound playing state
   */
  isAmbientPlaying: boolean;

  /**
   * Toggle the global mute state
   */
  toggleMute: () => void;

  /**
   * Set the mute state explicitly
   * @param muted - Whether audio should be muted
   */
  setMuted: (muted: boolean) => void;

  /**
   * Set the master volume level
   * @param volume - Volume level between 0 and 1
   */
  setVolume: (volume: number) => void;

  /**
   * Toggle ambient sound playback
   */
  toggleAmbient: () => void;

  /**
   * Set ambient playing state explicitly
   * @param playing - Whether ambient sound should be playing
   */
  setAmbientPlaying: (playing: boolean) => void;
}

/**
 * Audio store with localStorage persistence
 *
 * Persists user's audio preferences (mute state and volume) across sessions.
 * Ambient playing state is not persisted as it should reset on page load.
 *
 * @example
 * ```tsx
 * const { isMuted, volume, toggleMute, setVolume } = useAudioStore();
 *
 * // Toggle mute
 * toggleMute();
 *
 * // Set volume
 * setVolume(0.5); // 50% volume
 *
 * // Use with shallow comparison for performance
 * const isMuted = useAudioStore((state) => state.isMuted);
 * ```
 */
export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isMuted: false,
      volume: 0.7, // Default to 70% volume
      isAmbientPlaying: false,

      toggleMute: () => {
        set((state) => ({ isMuted: !state.isMuted }));
      },

      setMuted: (muted: boolean) => {
        set({ isMuted: muted });
      },

      setVolume: (volume: number) => {
        // Clamp volume between 0 and 1
        const clampedVolume = Math.max(0, Math.min(1, volume));
        set({ volume: clampedVolume });
      },

      toggleAmbient: () => {
        set((state) => ({ isAmbientPlaying: !state.isAmbientPlaying }));
      },

      setAmbientPlaying: (playing: boolean) => {
        set({ isAmbientPlaying: playing });
      },
    }),
    {
      name: 'tsn-audio',
      storage: createJSONStorage(() => {
        // SSR-safe localStorage access
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        // Only persist mute state and volume, not ambient playing state
        isMuted: state.isMuted,
        volume: state.volume,
      }),
    }
  )
);

/**
 * Shallow selector utilities for performance optimization
 */
export const audioSelectors = {
  /**
   * Select only the muted state
   */
  isMuted: (state: AudioState) => state.isMuted,

  /**
   * Select only the volume value
   */
  volume: (state: AudioState) => state.volume,

  /**
   * Select only the ambient playing state
   */
  isAmbientPlaying: (state: AudioState) => state.isAmbientPlaying,

  /**
   * Select only the toggleMute function
   */
  toggleMute: (state: AudioState) => state.toggleMute,

  /**
   * Select only the setMuted function
   */
  setMuted: (state: AudioState) => state.setMuted,

  /**
   * Select only the setVolume function
   */
  setVolume: (state: AudioState) => state.setVolume,

  /**
   * Select only the toggleAmbient function
   */
  toggleAmbient: (state: AudioState) => state.toggleAmbient,

  /**
   * Select only the setAmbientPlaying function
   */
  setAmbientPlaying: (state: AudioState) => state.setAmbientPlaying,
};
