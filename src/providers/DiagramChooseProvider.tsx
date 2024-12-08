'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { useERDProjectStore } from './ERDProjectProvider';

import type { ERDDiagram, ERDSchema } from '@/features/erd-project';

interface DiagramDataProps {
  schema: ERDSchema | undefined;
  diagram: ERDDiagram | undefined;
  setSchemaName: (schema: string | undefined) => void;
  setDiagramName: (diagram: string | undefined) => void;
}

const DiagramContext = createContext<DiagramDataProps | undefined>(undefined);

type DiagramProviderProps = PropsWithChildren;

export function DiagramChooseProvider({ children }: DiagramProviderProps) {
  const [schemaName, setSchemaName] = useState<string | undefined>(undefined);
  const [diagramName, setDiagramName] = useState<string | undefined>(undefined);

  const schemas = useERDProjectStore((state) => state.schemas);

  const findSchema = schemas.find((s) => s.name === schemaName);
  const findDiagram = findSchema?.diagrams.find((d) => d.name === diagramName);

  const data = useMemo(
    () => ({
      schema: findSchema,
      diagram: findDiagram,
      setSchemaName,
      setDiagramName,
    }),
    [findSchema, findDiagram],
  );

  return (
    <DiagramContext.Provider value={data}>{children}</DiagramContext.Provider>
  );
}

export function useDiagramContext() {
  const context = useContext(DiagramContext);

  if (!context) {
    throw new Error('useDiagramContext must be used within a DiagramProvider');
  }

  return context;
}
