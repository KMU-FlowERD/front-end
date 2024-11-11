'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { ERDDiagram, ERDSchema } from '@/features/erd-project';

interface DiagramDataProps {
  schema: ERDSchema | undefined;
  diagram: ERDDiagram | undefined;
  setSchema: (schema: ERDSchema | undefined) => void;
  setDiagram: (diagram: ERDDiagram | undefined) => void;
}

const DiagramContext = createContext<DiagramDataProps | undefined>(undefined);

type DiagramProviderProps = PropsWithChildren;

export function DiagramChooseProvider({ children }: DiagramProviderProps) {
  const [schema, setSchema] = useState<ERDSchema | undefined>(undefined);
  const [diagram, setDiagram] = useState<ERDDiagram | undefined>(undefined);

  const data = useMemo(
    () => ({ schema, diagram, setSchema, setDiagram }),
    [schema, diagram, setSchema, setDiagram],
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
