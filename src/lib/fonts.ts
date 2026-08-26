/**
 * Font Configuration
 * Using next/font/google for optimized font loading
 */

import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

/**
 * Space Grotesk - Display font for headings and hero text
 * Modern geometric sans-serif with technical aesthetic
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

/**
 * Inter - Body font for general text content
 * Highly readable, optimized for UI
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

/**
 * JetBrains Mono - Monospace font for code, data, and technical content
 * Clear and professional monospace typeface
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
});

/**
 * Combined font variable string for className application
 * Use this in the root layout to apply all font variables
 */
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`;
