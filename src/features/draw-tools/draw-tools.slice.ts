import { create } from 'zustand';

type CursorType = 'arrow' | 'pointer';
type EntityType = 'table' | 'memo' | 'none';

// 식별 1:1, 1:n, m,n, 비식별 1:1, 1:n, m,n
export type MappingType =
  | 'IdentifyOneToOne'
  | 'IdentifyOneToMany'
  | 'IdentifyManyToMany'
  | 'NonIdentifyOneToOne'
  | 'NonIdentifyOneToMany'
  | 'NonIdentifyManyToMany'
  | 'none';

export interface ToolsChoose {
  cursor: CursorType;
  entity: EntityType;
  mapping: MappingType;
}

export interface ToolsChooseAction {
  setCursor: (cursor: CursorType) => void;
  setEntity: (entity: EntityType) => void;
  setMapping: (mapping: MappingType) => void;
}

export type DrawToolsSlice = ToolsChoose & ToolsChooseAction;

const defaultValue: ToolsChoose = {
  cursor: 'arrow',
  entity: 'none',
  mapping: 'none',
};

export const useDrawToolsStore = create<DrawToolsSlice>()((set) => ({
  ...defaultValue,
  setCursor: (cursor) => set((prev) => ({ ...prev, cursor })),
  setEntity: (entity) => set((prev) => ({ ...prev, entity })),
  setMapping: (mapping) => set((prev) => ({ ...prev, mapping })),
}));
