'use client';

import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ERDTable } from '@/features/erd-project';

interface TableDataProps {
  menuOpen: boolean;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  isEditingColumns: boolean;
  editRef: MutableRefObject<HTMLDivElement | null>;
  table: ERDTable;
  tableColumns: ERDTable['columns'];
  setIsEditingColumns: (isEditingColumns: boolean) => void;
  setMenuOpen: (menuOpen: boolean) => void;
}

const TableContext = createContext<TableDataProps | undefined>(undefined);

type TableProviderProps = PropsWithChildren;

export function TableProvider({
  table,
  children,
}: { table: ERDTable } & TableProviderProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const editRef = useRef<HTMLDivElement | null>(null);

  const [isEditingColumns, setIsEditingColumns] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const setMenuOpenCallback = useCallback((val: boolean) => {
    setMenuOpen(val);
  }, []);

  const setIsEditingColumnsCallback = useCallback((val: boolean) => {
    setIsEditingColumns(val);
  }, []);

  const data = useMemo(
    () => ({
      menuOpen,
      menuRef,
      isEditingColumns,
      editRef,
      table,
      tableColumns: table.columns,
      setIsEditingColumns: setIsEditingColumnsCallback,
      setMenuOpen: setMenuOpenCallback,
    }),
    [
      menuOpen,
      isEditingColumns,
      table,
      setIsEditingColumnsCallback,
      setMenuOpenCallback,
    ],
  );

  return <TableContext.Provider value={data}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context;
}
