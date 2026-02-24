import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Providers from './providers';
import ClientLoader from '@/components/ClientLoader';
import CustomCursor from '@/components/CustomCursor';

import SmoothScroller from '@/components/SmoothScroller';
import BlackHoleBackground from '@/components/BlackHoleBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const satoshi = localFont({
  src: '../fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dynamic Developer Portfolio',
  description: 'A modern, interactive developer portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${satoshi.variable} font-sans`}>
        <CustomCursor />
        <SmoothScroller />
        <BlackHoleBackground />
        <Providers>
          <ClientLoader>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ClientLoader>
        </Providers>
      </body>
    </html>
  );
}
