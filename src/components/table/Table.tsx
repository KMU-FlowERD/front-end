'use client';

import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Columns } from './Columns';
import { styles } from './Table.styles';
import { TableMenu } from './TableMenu';

import { ColumnEditMenu } from '@/components/column-edit';
import { MenuIcon } from '@/components/implements-icon';
import { useDrawToolsStore } from '@/features/draw-tools';
import {
  useDrag,
  useOutsideClick,
} from '@/features/erd-page/erd-page.table.hook';
import type { ERDTable, WithPosition } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { TableProvider, useTableContext } from '@/providers/TableProvider';

interface Position {
  left: number;
  top: number;
}

interface TableProps {
  table: WithPosition<ERDTable>;
  child: boolean;
  highlight: boolean;
  onClick: (table: WithPosition<ERDTable>) => void;
  onPositionChange: (id: string, pos: Position) => void;
}

export function Table({
  table,
  child,
  highlight,
  onClick,
  onPositionChange,
}: TableProps) {
  return (
    <TableProvider table={table}>
      <TableConsumer
        table={table}
        child={child}
        highlight={highlight}
        onClick={onClick}
        onPositionChange={onPositionChange}
      />
    </TableProvider>
  );
}

function TableConsumer({
  table,
  child,
  highlight,
  onClick,
  onPositionChange,
}: TableProps) {
  const {
    menuOpen,
    setMenuOpen,
    menuRef,
    editRef,
    isEditingColumns,
    setIsEditingColumns,
  } = useTableContext();

  const createColumn = useERDProjectStore((state) => state.createColumn);
  const updateColumn = useERDProjectStore((state) => state.updateColumn);
  const deleteColumn = useERDProjectStore((state) => state.deleteColumn);

  const createRelation = useERDProjectStore((state) => state.createRelation);
  const updateRelation = useERDProjectStore((state) => state.updateRelation);
  const deleteRelation = useERDProjectStore((state) => state.deleteRelation);

  const updateTable = useERDProjectStore((state) => state.updateTable);

  const notation = useDrawToolsStore((state) => state.notation);

  const boxRef = useRef<HTMLDivElement | null>(null);

  const pkColumns = table.columns
    .filter((val) => val.keyType === 'PK')
    .sort((a, b) =>
      (a.constraintName || '').localeCompare(b.constraintName || ''),
    );
  const pkfkColumns = table.columns
    .filter((val) => val.keyType === 'PK/FK')
    .filter(
      (column, index, self) =>
        index ===
        self.findIndex((c) => c.id === column.id && c.name === column.name),
    )
    .sort((a, b) =>
      (a.constraintName || '').localeCompare(b.constraintName || ''),
    );
  const fkColumns = table.columns
    .filter((val) => val.keyType === 'FK')
    .filter(
      (column, index, self) =>
        index ===
        self.findIndex((c) => c.id === column.id && c.name === column.name),
    )
    .sort((a, b) =>
      (a.constraintName || '').localeCompare(b.constraintName || ''),
    );
  const columns = table.columns
    .filter((val) => val.keyType === undefined)
    .sort((a, b) =>
      (a.constraintName || '').localeCompare(b.constraintName || ''),
    );

  const { handleMouseDown } = useDrag((newPos) => {
    if (!menuOpen && !isEditingColumns) onPositionChange(table.id, newPos);
  });

  const { schema } = useDiagramContext();

  useOutsideClick(
    [menuRef, boxRef, editRef],
    [],
    () => {
      setIsEditingColumns(false);
      setMenuOpen(false);
    },
    menuOpen || isEditingColumns,
  );

  useLayoutEffect(() => {
    if (schema === undefined) return;

    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      if (width !== table.width || height !== table.height) {
        updateTable(schema.name, {
          ...table,
          width,
          height,
        });
      }
    }
  }, [
    schema,
    table,
    updateTable,
    createColumn,
    updateColumn,
    deleteColumn,
    createRelation,
    updateRelation,
    deleteRelation,
  ]);

  return (
    <styles.displayWrapper $pos={{ left: table.left, top: table.top }}>
      <styles.titleMenuWrapper>
        <styles.tableTitle>{table.title}</styles.tableTitle>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
      </styles.titleMenuWrapper>
      <styles.container
        ref={boxRef}
        $child={child && notation === 'IDEF1X'}
        $highlight={highlight}
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
        {createPortal(
          <ColumnEditMenu left={table.left} top={table.top} />,
          document.body,
        )}
      </styles.container>
    </styles.displayWrapper>
  );
}
