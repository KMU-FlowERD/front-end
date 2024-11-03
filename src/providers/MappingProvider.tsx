'use client';

import type { MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { useERDProjectStore } from './ERDProjectProvider';

import type { ERDRelation } from '@/features/erd-project';
import type { TableDirectionChild } from '@/features/mapping';
import { useContextMenu, useRelationshipData } from '@/features/mapping';

interface MappingDataProps {
  relationDuplicate: ERDRelation[];
  tableDirection: Map<string, TableDirectionChild>;
  selfReferenceMapping: Map<string, number>;
  contextMenu: {
    x: number;
    y: number;
  } | null;
  lastRelation: ERDRelation | null;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  openContextMenu: (event: React.MouseEvent, relation: ERDRelation) => void;
  closeContextMenu: () => void;
}

const MappingContext = createContext<MappingDataProps | undefined>(undefined);

type MappingProviderProps = PropsWithChildren;

export function MappingProvider({ children }: MappingProviderProps) {
  const tables = useERDProjectStore((state) => state.tables);
  const relations = useERDProjectStore((state) => state.relations);

  const relationshipData = useRelationshipData(tables, relations);
  const contextMenu = useContextMenu();

  const data = useMemo(
    () => ({
      ...relationshipData,
      ...contextMenu,
    }),
    [relationshipData, contextMenu],
  );

  return (
    <MappingContext.Provider value={data}>{children}</MappingContext.Provider>
  );
}

export function useMappingContext() {
  const context = useContext(MappingContext);

  if (!context) {
    throw new Error('useMappingContext must be used within a MappingProvider');
  }

  return context;
}
