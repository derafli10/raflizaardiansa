import type { Metadata } from 'next';
import { spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rafli Zaardiansa — Network, Hardware, Software & Cyber Security',
  description:
    'Engineering the invisible infrastructure that keeps the world connected. Portfolio of Rafli Zaardiansa, specializing in network engineering, hardware design, software development, and cybersecurity.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
