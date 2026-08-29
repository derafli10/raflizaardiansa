/**
 * Cursor State Hook
 *
 * Manages custom cursor visual states synchronized with the global app store.
 * Provides helper functions to easily set cursor states on hover/interaction.
 *
 * @module hooks/useCursorState
 */

import { useCallback } from 'react';
import { useAppStore, type CursorState } from '@/stores/app-store';

/**
 * Cursor state management return value
 */
interface UseCursorStateReturn {
  /**
   * Current cursor state
   * - 'dot': Default 8px circle
   * - 'grow': Expanded 48px on links/buttons
   * - 'blend': 64px mix-blend-mode on text
   * - 'view': 64px with "VIEW" label on project cards
   */
  cursorState: CursorState;

  /**
   * Set cursor to 'dot' state (default)
   * Small 8px circle for normal cursor
   */
  setDot: () => void;

  /**
   * Set cursor to 'grow' state
   * Expanded 48px for interactive elements (links, buttons)
   */
  setGrow: () => void;

  /**
   * Set cursor to 'blend' state
   * 64px with mix-blend-mode for text hover effects
   */
  setBlend: () => void;

  /**
   * Set cursor to 'view' state
   * 64px with "VIEW" label for project cards
   */
  setView: () => void;

  /**
   * Reset cursor to default dot state
   * Alias for setDot()
   */
  resetCursor: () => void;

  /**
   * Generic setter for any cursor state
   * Use specific helpers above for better DX
   */
  setCursorState: (state: CursorState) => void;
}

/**
 * useCursorState Hook
 *
 * Manages custom cursor visual states with the global app store.
 * Provides convenient helper functions for common cursor state transitions.
 *
 * **Cursor States:**
 * - `dot`: Default 8px circle (normal cursor)
 * - `grow`: 48px expanded state (links, buttons)
 * - `blend`: 64px with mix-blend-mode (text hover)
 * - `view`: 64px with "VIEW" label (project cards)
 *
 * **Performance:**
 * - Selectors optimized with shallow comparison
 * - Callbacks memoized with useCallback
 * - No unnecessary re-renders
 * - SSR-safe (works on server and client)
 *
 * @returns Cursor state and helper functions
 *
 * @example
 * ```tsx
 * // Basic usage - set cursor state on hover
 * function InteractiveButton() {
 *   const { setGrow, resetCursor } = useCursorState();
 *
 *   return (
 *     <button
 *       onMouseEnter={setGrow}
 *       onMouseLeave={resetCursor}
 *     >
 *       Hover me
 *     </button>
 *   );
 * }
 *
 * // Project card with VIEW cursor
 * function ProjectCard() {
 *   const { setView, resetCursor } = useCursorState();
 *
 *   return (
 *     <div
 *       onMouseEnter={setView}
 *       onMouseLeave={resetCursor}
 *       className="project-card"
 *     >
 *       View Project
 *     </div>
 *   );
 * }
 *
 * // Text with blend mode cursor
 * function TextHighlight() {
 *   const { setBlend, resetCursor } = useCursorState();
 *
 *   return (
 *     <span
 *       onMouseEnter={setBlend}
 *       onMouseLeave={resetCursor}
 *     >
 *       Highlighted Text
 *     </span>
 *   );
 * }
 *
 * // Read current state
 * function CursorDebug() {
 *   const { cursorState } = useCursorState();
 *   return <div>Current: {cursorState}</div>;
 * }
 *
 * // Generic setter for dynamic states
 * function DynamicCursor() {
 *   const { setCursorState, resetCursor } = useCursorState();
 *
 *   const handleHover = (type: 'link' | 'card') => {
 *     setCursorState(type === 'link' ? 'grow' : 'view');
 *   };
 *
 *   return (
 *     <div
 *       onMouseEnter={() => handleHover('link')}
 *       onMouseLeave={resetCursor}
 *     >
 *       Dynamic Cursor
 *     </div>
 *   );
 * }
 * ```
 *
 * **Integration with Custom Cursor Component:**
 * The cursor component should subscribe to `cursorState` and render
 * the appropriate visual based on the current state.
 *
 * @see {@link useAppStore} - Global app store
 */
export function useCursorState(): UseCursorStateReturn {
  // Subscribe to cursor state with optimized selector
  const cursorState = useAppStore((state) => state.cursorState);
  const setCursorState = useAppStore((state) => state.setCursorState);
  const resetCursor = useAppStore((state) => state.resetCursor);

  // Memoized helper functions for common cursor states
  const setDot = useCallback(() => {
    setCursorState('dot');
  }, [setCursorState]);

  const setGrow = useCallback(() => {
    setCursorState('grow');
  }, [setCursorState]);

  const setBlend = useCallback(() => {
    setCursorState('blend');
  }, [setCursorState]);

  const setView = useCallback(() => {
    setCursorState('view');
  }, [setCursorState]);

  return {
    cursorState,
    setDot,
    setGrow,
    setBlend,
    setView,
    resetCursor,
    setCursorState,
  };
}
