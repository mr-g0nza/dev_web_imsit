"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { initializeFirebase } from '@/firebase';
import { FirebaseProvider, type FirebaseServices } from '@/firebase/provider';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // Firebase should only be initialized on the client.
    const firebaseServices = initializeFirebase();
    setServices(firebaseServices);
  }, []);

  if (!services) {
    // Show a global loader, or a skeleton screen while Firebase is initializing.
    return null; 
  }

  return <FirebaseProvider {...services}>{children}</FirebaseProvider>;
}
