'use client';

import type { PropsWithChildren} from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { ERDProjectStore } from '@/features/erd-project';
import { createERDProjectStore } from '@/features/erd-project';

export type ERDProjectStoreAPI = ReturnType<typeof createERDProjectStore>;

export const ERDProjectContext = createContext<ERDProjectStoreAPI | undefined>(
  undefined,
);

export type ERDProjectProviderProps = PropsWithChildren;

export function ERDProjectProvider({ children }: ERDProjectProviderProps) {
  const storeRef = useRef<ERDProjectStoreAPI>();
  if (!storeRef.current) {
    storeRef.current = createERDProjectStore();
  }

  return (
    <ERDProjectContext.Provider value={storeRef.current}>
      {children}
    </ERDProjectContext.Provider>
  );
}

export const useERDProjectStore = <T,>(
  selector: (store: ERDProjectStore) => T,
): T => {
  const store = useContext(ERDProjectContext);

  if (!store) {
    throw new Error(
      'useERDProjectStore must be used within a ERDProjectProvider',
    );
  }

  return useStore(store, selector);
};
