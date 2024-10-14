'use client';

import styled from '@emotion/styled';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';

import { ColumnEditMenu } from '@/components/ColumnEditMenu';
import { MenuIcon } from '@/components/implements-icon';
import {
  Columns,
  PkColumns,
  PkFkColumns,
  FkColumns,
  TableMenu,
} from '@/components/table';
import { ERDColumn, ERDTable } from '@/features/erd-project';

interface Position {
  left: number;
  top: number;
}

interface TableProps {
  table: ERDTable;
  onClick: (table: ERDTable) => void;
  onPositionChange: (id: string, pos: Position) => void;
  updateTable: (table: ERDTable) => void;
  deleteTable: (tableId: ERDTable['id']) => void;
  createColumn: (table: ERDTable, isPK: boolean) => void;
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
  deleteColumn: (table: ERDTable, column: ERDColumn) => void;
}

export function Table({
  table,
  onClick,
  onPositionChange,
  updateTable,
  deleteTable,
  createColumn,
  updateColumn,
  deleteColumn,
}: TableProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const editRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingColumns, setIsEditingColumns] = useState(false);

  const pkColumns = table.columns.filter((val) => val.keyType === 'pk');
  const pkfkColumns = table.columns.filter((val) => val.keyType === 'pk/fk');
  const fkColumns = table.columns.filter((val) => val.keyType === 'fk');
  const columns = table.columns.filter((val) => val.keyType === undefined);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDragging(true);
      setOffset({
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
      });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
  }, [boxRef.current?.getBoundingClientRect()]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !boxRef.current?.contains(e.target as Node) &&
        !editRef.current?.contains(e.target as Node)
      ) {
        setIsEditingColumns(false);
        setMenuOpen(false);
      }
    };

    if (menuOpen || isEditingColumns) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingColumns, menuOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newPos = {
          left: e.clientX - offset.left,
          top: e.clientY - offset.top,
        };
        onPositionChange(table.id, newPos);
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset.left, offset.top, onPositionChange, table.id]);

  return (
    <styles.displayWrapper $pos={{ left: table.left, top: table.top }}>
      <styles.titleMenuWrapper>
        <styles.tableTitle>{table.title}</styles.tableTitle>
        <MenuIcon onClick={toggleMenu} />
      </styles.titleMenuWrapper>
      <styles.container
        ref={boxRef}
        onClick={() => onClick(table)}
        onMouseDown={handleMouseDown}
      >
        <PkColumns pkColumns={pkColumns} />
        <PkFkColumns pkfkColumns={pkfkColumns} />
        {(pkColumns.length > 0 || pkfkColumns.length > 0) &&
          (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
        <Columns columns={columns} />
        <FkColumns fkColumns={fkColumns} />

        {menuOpen && (
          <TableMenu
            menuRef={menuRef}
            table={table}
            deleteTable={deleteTable}
            createColumn={createColumn}
            setIsEditingColumns={setIsEditingColumns}
            setMenuOpen={setMenuOpen}
          />
        )}
        {isEditingColumns && (
          <ColumnEditMenu
            editRef={editRef}
            tableColumns={table.columns}
            table={table}
            updateColumn={updateColumn}
            deleteColumn={deleteColumn}
            updateTable={updateTable}
          />
        )}
      </styles.container>
    </styles.displayWrapper>
  );
}

const styles = {
  displayWrapper: styled.div<{ $pos: Position }>`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: ${({ $pos }) => `${$pos.left}px`};
    top: ${({ $pos }) => `${$pos.top - 20}px`};
  `,

  titleMenuWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,

  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 50px;
    min-height: 30px;
    display: inline-flex;
    border: 0.5px solid #606060;
    background: rgba(34, 34, 34, 0.7);
    flex-direction: column;
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  `,

  tableTitle: styled.div`
    font-size: 12px;
    color: #ededed;
    flex-grow: 1;
    justify-items: start;
    margin-right: 10px;
    width: 100%;
    left: 0px;
    top: -20px;
  `,

  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
  `,
};
