import { create } from 'zustand';

type CursorType = 'arrow' | 'pointer';
type EntityType = 'table' | 'memo' | 'none';

export interface ToolsChoose {
  cursor: CursorType;
  entity: EntityType;
  mapping: number;
}

export interface ToolsChooseAction {
  setCursor: (cursor: CursorType) => void;
  setEntity: (entity: EntityType) => void;
  setMapping: (mapping: number) => void;
}

export type DrawToolsSlice = ToolsChoose & ToolsChooseAction;

const defaultValue: ToolsChoose = {
  cursor: 'arrow',
  entity: 'none',
  mapping: 0,
};

export const useDrawToolsStore = create<DrawToolsSlice>()((set) => ({
  ...defaultValue,
  setCursor: (cursor) => set((prev) => ({ ...prev, cursor })),
  setEntity: (entity) => set((prev) => ({ ...prev, entity })),
  setMapping: (mapping) => set((prev) => ({ ...prev, mapping })),
}));
