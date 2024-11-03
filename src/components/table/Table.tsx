'use client';

import { useLayoutEffect, useRef } from 'react';

import { Columns } from './Columns';
import { styles } from './Table.styles';
import { TableMenu } from './TableMenu';

import { ColumnEditMenu } from '@/components/column-edit';
import { MenuIcon } from '@/components/implements-icon';
import {
  useDrag,
  useOutsideClick,
} from '@/features/erd-page/erd-page.table.hook';
import type { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import { TableProvider, useTableContext } from '@/providers/TableProvider';

interface Position {
  left: number;
  top: number;
}

interface TableProps {
  table: ERDTable;
  onClick: (table: ERDTable) => void;
  onPositionChange: (id: string, pos: Position) => void;
}

export function Table({ table, onClick, onPositionChange }: TableProps) {
  return (
    <TableProvider table={table}>
      <TableConsumer
        table={table}
        onClick={onClick}
        onPositionChange={onPositionChange}
      />
    </TableProvider>
  );
}

function TableConsumer({ table, onClick, onPositionChange }: TableProps) {
  const {
    menuOpen,
    setMenuOpen,
    menuRef,
    editRef,
    isEditingColumns,
    setIsEditingColumns,
  } = useTableContext();

  const updateTable = useERDProjectStore((state) => state.updateTable);

  const boxRef = useRef<HTMLDivElement | null>(null);

  const pkColumns = table.columns.filter((val) => val.keyType === 'PK');
  const pkfkColumns = table.columns.filter((val) => val.keyType === 'PK/FK');
  const fkColumns = table.columns.filter((val) => val.keyType === 'FK');
  const columns = table.columns.filter((val) => val.keyType === undefined);

  const { handleMouseDown } = useDrag((newPos) =>
    onPositionChange(table.id, newPos),
  );

  useOutsideClick(
    [menuRef, boxRef, editRef],
    () => {
      setIsEditingColumns(false);
      setMenuOpen(false);
    },
    menuOpen || isEditingColumns,
  );

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      if (width !== table.width || height !== table.height) {
        updateTable({
          ...table,
          width,
          height,
        });
      }
    }
  }, [table, updateTable]);

  return (
    <styles.displayWrapper $pos={{ left: table.left, top: table.top }}>
      <styles.titleMenuWrapper>
        <styles.tableTitle>{table.title}</styles.tableTitle>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
      </styles.titleMenuWrapper>
      <styles.container
        ref={boxRef}
        onClick={() => onClick(table)}
        onMouseDown={(e) => handleMouseDown(e, boxRef)}
      >
        <Columns columns={pkColumns} />
        <Columns columns={pkfkColumns} />
        {(pkColumns.length > 0 || pkfkColumns.length > 0) &&
          (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
        <Columns columns={columns} />
        <Columns columns={fkColumns} />
        <TableMenu />
        <ColumnEditMenu />
      </styles.container>
    </styles.displayWrapper>
  );
}
