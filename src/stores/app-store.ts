/**
 * Application Store
 *
 * Manages global application state including loading states, preloader completion,
 * and custom cursor state management.
 *
 * @module stores/app-store
 */

import { create } from 'zustand';

/**
 * Cursor state type - defines the visual state of the custom cursor
 */
export type CursorState = 'dot' | 'grow' | 'blend' | 'view';

/**
 * Application store state interface
 */
interface AppState {
  /**
   * Initial application load state
   * True when the app has fully loaded and is interactive
   */
  isLoaded: boolean;

  /**
   * Preloader boot sequence completion state
   * True when the boot animation has finished playing
   */
  isPreloaderComplete: boolean;

  /**
   * Current custom cursor visual state
   * - 'dot': Default 8px circle
   * - 'grow': Expanded 48px on links/buttons
   * - 'blend': 64px mix-blend-mode on text
   * - 'view': 64px with "VIEW" label on project cards
   */
  cursorState: CursorState;

  /**
   * Set the application loaded state
   * @param loaded - Whether the app is fully loaded
   */
  setLoaded: (loaded: boolean) => void;

  /**
   * Set the preloader completion state
   * @param complete - Whether the preloader animation has completed
   */
  setPreloaderComplete: (complete: boolean) => void;

  /**
   * Set the custom cursor visual state
   * @param state - The cursor state to apply
   */
  setCursorState: (state: CursorState) => void;

  /**
   * Reset cursor to default dot state
   */
  resetCursor: () => void;
}

/**
 * Application store
 *
 * Manages application-level state that doesn't need persistence.
 * These values reset on page load/refresh.
 *
 * @example
 * ```tsx
 * const { isLoaded, setLoaded } = useAppStore();
 *
 * // Set loaded state
 * useEffect(() => {
 *   setLoaded(true);
 * }, []);
 *
 * // Use with shallow comparison for performance
 * const cursorState = useAppStore((state) => state.cursorState);
 * ```
 */
export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  isPreloaderComplete: false,
  cursorState: 'dot',

  setLoaded: (loaded: boolean) => {
    set({ isLoaded: loaded });
  },

  setPreloaderComplete: (complete: boolean) => {
    set({ isPreloaderComplete: complete });
  },

  setCursorState: (state: CursorState) => {
    set({ cursorState: state });
  },

  resetCursor: () => {
    set({ cursorState: 'dot' });
  },
}));

/**
 * Shallow selector utilities for performance optimization
 */
export const appSelectors = {
  /**
   * Select only the loaded state
   */
  isLoaded: (state: AppState) => state.isLoaded,

  /**
   * Select only the preloader complete state
   */
  isPreloaderComplete: (state: AppState) => state.isPreloaderComplete,

  /**
   * Select only the cursor state
   */
  cursorState: (state: AppState) => state.cursorState,

  /**
   * Select only the setLoaded function
   */
  setLoaded: (state: AppState) => state.setLoaded,

  /**
   * Select only the setPreloaderComplete function
   */
  setPreloaderComplete: (state: AppState) => state.setPreloaderComplete,

  /**
   * Select only the setCursorState function
   */
  setCursorState: (state: AppState) => state.setCursorState,

  /**
   * Select only the resetCursor function
   */
  resetCursor: (state: AppState) => state.resetCursor,
};
