'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';
import { usePathname } from 'next/navigation';

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Prevent scrolling and manage cursor while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.cursor = 'auto'; // Force system cursor during loading
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.cursor = 'none'; // Re-enable custom cursor
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && !showWelcome && (
        <LoadingScreen onComplete={() => setShowWelcome(true)} />
      )}
      
      {isLoading && showWelcome && (
        <WelcomeScreen onComplete={() => setIsLoading(false)} />
      )}

      <div className={(isLoading && !showWelcome) ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}>
        {children}
      </div>
    </>
  );
}
