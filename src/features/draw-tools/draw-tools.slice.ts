import { create } from 'zustand';

import type { Cardinality } from '@/features/erd-project';

type CursorType = 'ARROW' | 'POINTER';
type EntityType = 'TABLE' | 'MEMO' | 'NONE';
type NotationType = 'IE' | 'IDEF1X';

// 식별 1:1, 1:n, m,n, 비식별 1:1, 1:n, m,n
export interface MappingType {
  cardinality: {
    from: Cardinality;
    to: Cardinality;
  };
  identify: boolean;
}

export interface ToolsChoose {
  cursor: CursorType;
  entity: EntityType;
  mapping?: MappingType;
  notation: NotationType;
}

export interface ToolsChooseAction {
  setCursor: (cursor: CursorType) => void;
  setEntity: (entity: EntityType) => void;
  setMapping: (mapping?: MappingType) => void;
  setNotation: (notation: NotationType) => void;
}

export type DrawToolsSlice = ToolsChoose & ToolsChooseAction;

const defaultValue: ToolsChoose = {
  cursor: 'ARROW',
  entity: 'NONE',
  notation: 'IE',
};

export const useDrawToolsStore = create<DrawToolsSlice>()((set) => ({
  ...defaultValue,
  setCursor: (cursor) => set((prev) => ({ ...prev, cursor })),
  setEntity: (entity) => set((prev) => ({ ...prev, entity })),
  setMapping: (mapping?) => set((prev) => ({ ...prev, mapping })),
  setNotation: (notation) => set((prev) => ({ ...prev, notation })),
}));
