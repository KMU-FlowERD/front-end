'use client';

import { createContext, PropsWithChildren, useContext, useRef } from 'react';

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

export const useERDProjectStore = () => {
  const store = useContext(ERDProjectContext);

  if (!store) {
    throw new Error(
      'useERDProjectStore must be used within a ERDProjectProvider',
    );
  }
  
  return store;
};
