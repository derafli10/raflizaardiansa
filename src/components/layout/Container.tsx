import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Container width variant
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  /**
   * Enable responsive padding
   * @default true
   */
  padding?: boolean;
}

/**
 * Container component with responsive max-width and padding.
 * Provides consistent horizontal spacing and maximum content width across breakpoints.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * <Container size="lg" padding={false}>
 *   <Grid>...</Grid>
 * </Container>
 * ```
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', padding = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          // Responsive padding (mobile-first)
          padding && [
            'px-4', // 16px on mobile
            'sm:px-6', // 24px on mobile landscape (640px+)
            'md:px-8', // 32px on tablet (768px+)
            'lg:px-10', // 40px on desktop (1024px+)
          ],
          // Responsive max-width matching Tailwind breakpoints
          {
            'max-w-screen-sm': size === 'sm', // 640px
            'max-w-screen-md': size === 'default', // 768px
            'max-w-screen-lg': size === 'lg', // 1024px
            'max-w-screen-xl': size === 'xl', // 1280px
            'max-w-full': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };
