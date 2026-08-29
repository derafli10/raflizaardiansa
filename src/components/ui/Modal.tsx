'use client';

/**
 * Modal Primitive Component
 *
 * Elite PCB-inspired accessible modal dialog built with Headless UI Dialog
 * and Motion AnimatePresence. Features circuit-trace border expansion animations,
 * responsive multi-size configurations (sm, md, lg, xl, full), and full WCAG accessibility.
 *
 * @module components/ui/Modal
 */

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /**
   * Controlled open state
   */
  isOpen: boolean;
  /**
   * Callback fired when modal requests to close
   */
  onClose: () => void;
  /**
   * Modal max-width size variant
   * @default 'lg'
   */
  size?: ModalSize;
  /**
   * Title displayed in modal header
   */
  title?: ReactNode;
  /**
   * Subtitle or description text
   */
  description?: ReactNode;
  /**
   * Modal dialog content
   */
  children: ReactNode;
  /**
   * Custom className for modal panel
   */
  className?: string;
  /**
   * Show decorative circuit corner solder pads
   * @default true
   */
  showCircuitAccents?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[95vw] lg:max-w-7xl',
};

/**
 * Modal Component
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Project Architecture: Network Topology"
 *   size="xl"
 * >
 *   <div className="space-y-4">
 *     <p>Case study details...</p>
 *   </div>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  size = 'lg',
  title,
  description,
  children,
  className,
  showCircuitAccents = true,
}: ModalProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static open={isOpen} onClose={onClose} className="z-modal relative">
          {/* Backdrop Blur Overlay */}
          <DialogBackdrop className="z-modal bg-substrate/80 fixed inset-0 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              className="absolute inset-0"
              aria-hidden="true"
            />
          </DialogBackdrop>

          {/* Modal Container */}
          <div className="z-modal fixed inset-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="flex w-full items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: prefersReducedMotion ? 0 : 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: prefersReducedMotion ? 0 : 15 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1], // fluid ease-out
                  }}
                  className={cn(
                    'border-trace bg-substrate-raised relative w-full overflow-hidden rounded-2xl border p-6 sm:p-8',
                    'shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_25px_rgba(212,165,116,0.15)]',
                    'text-text-primary font-sans transition-all',
                    sizeClasses[size],
                    className
                  )}
                >
                  {/* Circuit Corner Solder Pads */}
                  {showCircuitAccents && (
                    <>
                      <span
                        className="border-copper pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2"
                        aria-hidden="true"
                      />
                      <span
                        className="border-copper pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2"
                        aria-hidden="true"
                      />
                      <span
                        className="border-copper pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2"
                        aria-hidden="true"
                      />
                      <span
                        className="border-copper pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2"
                        aria-hidden="true"
                      />
                      {/* Top ambient copper trace line */}
                      <span
                        className="via-copper/40 pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  {/* Close Button with Keyboard Accessibility */}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className={cn(
                      'text-text-secondary absolute top-4 right-4 rounded-lg p-2 sm:top-6 sm:right-6',
                      'hover:bg-substrate hover:text-copper transition-all duration-200 active:scale-95',
                      'focus-visible:ring-copper focus-visible:ring-offset-substrate focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                    )}
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Header Section */}
                  {(title || description) && (
                    <div className="border-trace/60 mb-6 space-y-1.5 border-b pr-10 pb-5">
                      {title && (
                        <HeadlessDialogTitle className="font-display text-text-primary text-xl font-bold tracking-tight sm:text-2xl">
                          {title}
                        </HeadlessDialogTitle>
                      )}
                      {description && (
                        <p className="text-text-secondary font-sans text-sm leading-relaxed">
                          {description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Modal Body Content */}
                  <div className="text-text-secondary relative text-sm">{children}</div>
                </motion.div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

/**
 * ModalFooter Subcomponent
 */
export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-trace/60 mt-6 flex flex-wrap items-center justify-end gap-3 border-t pt-5',
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = 'ModalFooter';
