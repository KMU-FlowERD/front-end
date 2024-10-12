import { create } from 'zustand';

type CursorType = 'arrow' | 'pointer';
type EntityType = 'table' | 'memo' | 'none';

// 식별 1:1, 1:n, m,n, 비식별 1:1, 1:n, m,n
export interface MappingType {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  identify: boolean;
}

export interface ToolsChoose {
  cursor: CursorType;
  entity: EntityType;
  mapping?: MappingType;
}

export interface ToolsChooseAction {
  setCursor: (cursor: CursorType) => void;
  setEntity: (entity: EntityType) => void;
  setMapping: (mapping?: MappingType) => void;
}

export type DrawToolsSlice = ToolsChoose & ToolsChooseAction;

const defaultValue: ToolsChoose = {
  cursor: 'arrow',
  entity: 'none',
};

export const useDrawToolsStore = create<DrawToolsSlice>()((set) => ({
  ...defaultValue,
  setCursor: (cursor) => set((prev) => ({ ...prev, cursor })),
  setEntity: (entity) => set((prev) => ({ ...prev, entity })),
  setMapping: (mapping?) => set((prev) => ({ ...prev, mapping })),
}));
