'use client';

import { useEffect } from 'react';
import { initializeDatabase } from '@/lib/db';

export function DatabaseInitializer() {
  useEffect(() => {
    initializeDatabase().catch(console.error);
  }, []);

  return null;
}