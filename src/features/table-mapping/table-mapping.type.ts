import { ERDTable } from '@/features/erd-project';

export type TableDirectionChild = Map<
  Direction,
  { sortVal: number; tableID: ERDTable['id'] }[]
>;

export type Direction = 'top' | 'bottom' | 'left' | 'right';
