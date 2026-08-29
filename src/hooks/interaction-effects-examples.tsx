/**
 * Interaction Effects Hooks - Usage Examples
 *
 * Demonstrates how to use the custom interaction hooks:
 * - useMagneticElement: GSAP-based magnetic pull effect
 * - useTiltEffect: 3D tilt on hover
 * - useCursorState: Custom cursor state management
 *
 * @module hooks/interaction-effects-examples
 */

'use client';

import { useMagneticElement } from './useMagneticElement';
import { useTiltEffect } from './useTiltEffect';
import { useCursorState } from './useCursorState';

/**
 * Example 1: Magnetic Button
 * Button with magnetic pull effect when cursor is nearby
 */
export function MagneticButton() {
  const magneticRef = useMagneticElement<HTMLButtonElement>({
    strength: 0.3,
    radius: 100,
  });

  return (
    <button
      ref={magneticRef}
      className="bg-copper text-substrate-base hover:bg-copper/90 rounded-lg px-6 py-3 transition-colors"
    >
      Magnetic Button
    </button>
  );
}

/**
 * Example 2: 3D Tilt Card
 * Card with 3D tilt effect on mouse move
 */
export function TiltCard() {
  const tiltRef = useTiltEffect<HTMLDivElement>({ intensity: 10 });

  return (
    <div
      ref={tiltRef}
      className="border-trace bg-substrate-raised shadow-copper-glow rounded-lg border p-6"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <h3 className="font-display text-text-primary mb-2 text-xl">3D Tilt Card</h3>
      <p className="text-text-secondary">
        Move your mouse over this card to see the 3D tilt effect in action.
      </p>
    </div>
  );
}

/**
 * Example 3: Cursor State Button
 * Button that changes cursor state on hover
 */
export function CursorStateButton() {
  const { setGrow, resetCursor } = useCursorState();

  return (
    <button
      onMouseEnter={setGrow}
      onMouseLeave={resetCursor}
      className="bg-substrate-raised text-text-primary hover:bg-substrate-raised/80 rounded-lg px-6 py-3 transition-colors"
    >
      Hover for Cursor Change
    </button>
  );
}

/**
 * Example 4: Project Card with VIEW Cursor
 * Card that shows "VIEW" cursor label on hover
 */
export function ProjectCard() {
  const { setView, resetCursor } = useCursorState();

  return (
    <div
      onMouseEnter={setView}
      onMouseLeave={resetCursor}
      className="group border-trace bg-substrate-raised hover:border-copper hover:shadow-copper-glow cursor-pointer rounded-lg border p-6 transition-all"
    >
      <h3 className="font-display text-text-primary mb-2 text-xl">Project Name</h3>
      <p className="text-text-secondary">Hover to see the custom VIEW cursor</p>
    </div>
  );
}

/**
 * Example 5: Text with Blend Cursor
 * Text that shows blend mode cursor on hover
 */
export function BlendText() {
  const { setBlend, resetCursor } = useCursorState();

  return (
    <p onMouseEnter={setBlend} onMouseLeave={resetCursor} className="text-text-primary">
      Hover over this text to see the blend mode cursor effect.
    </p>
  );
}

/**
 * Example 6: Combined Effects
 * Component using both magnetic and tilt effects together
 */
export function MagneticTiltCard() {
  const magneticRef = useMagneticElement<HTMLDivElement>({
    strength: 0.2,
    radius: 120,
  });
  const tiltRef = useTiltEffect<HTMLDivElement>({ intensity: 8 });
  const { setView, resetCursor } = useCursorState();

  // Note: You can't use both refs on the same element directly
  // This is a conceptual example - in practice, you'd nest elements
  // or create a combined hook

  return (
    <div ref={magneticRef}>
      <div
        ref={tiltRef}
        onMouseEnter={setView}
        onMouseLeave={resetCursor}
        className="border-trace bg-substrate-raised shadow-copper-glow rounded-lg border p-6"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <h3 className="font-display text-text-primary mb-2 text-xl">Combined Effects</h3>
        <p className="text-text-secondary">
          This card has both magnetic pull and 3D tilt effects, plus custom cursor state.
        </p>
      </div>
    </div>
  );
}

/**
 * Example 7: Interactive Link
 * Link with magnetic effect and grow cursor
 */
export function InteractiveLink() {
  const magneticRef = useMagneticElement<HTMLAnchorElement>({
    strength: 0.4,
    radius: 80,
  });
  const { setGrow, resetCursor } = useCursorState();

  return (
    <a
      ref={magneticRef}
      href="#"
      onMouseEnter={setGrow}
      onMouseLeave={resetCursor}
      className="text-copper decoration-copper/30 hover:decoration-copper inline-block underline underline-offset-4 transition-colors"
    >
      Interactive Link
    </a>
  );
}

/**
 * Example 8: Subtle Tilt Button
 * Button with very subtle 3D tilt for elegance
 */
export function SubtleTiltButton() {
  const tiltRef = useTiltEffect<HTMLButtonElement>({ intensity: 5 });
  const { setGrow, resetCursor } = useCursorState();

  return (
    <button
      ref={tiltRef}
      onMouseEnter={setGrow}
      onMouseLeave={resetCursor}
      className="border-trace bg-substrate-raised text-text-primary hover:border-copper rounded-lg border px-6 py-3 transition-all"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
    >
      Subtle Tilt Button
    </button>
  );
}

/**
 * Demo Page Component
 * Showcases all interaction effects in one place
 */
export function InteractionEffectsDemo() {
  return (
    <div className="space-y-8 p-8">
      <section className="space-y-4">
        <h2 className="font-display text-text-primary text-2xl">Magnetic Effects</h2>
        <div className="flex gap-4">
          <MagneticButton />
          <InteractiveLink />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-text-primary text-2xl">3D Tilt Effects</h2>
        <div className="grid grid-cols-2 gap-4">
          <TiltCard />
          <SubtleTiltButton />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-text-primary text-2xl">Cursor States</h2>
        <div className="space-y-4">
          <CursorStateButton />
          <ProjectCard />
          <BlendText />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-text-primary text-2xl">Combined Effects</h2>
        <MagneticTiltCard />
      </section>
    </div>
  );
}
