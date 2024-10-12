'use client';

import styled from '@emotion/styled';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';

import { ColumnEditMenu } from './ColumnEditMenu';

import { ERDColumn, ERDTable } from '@/features/erd-project';

interface Position {
  left: number;
  top: number;
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
}: {
  table: ERDTable;
  onClick: (table: ERDTable) => void;
  onPositionChange: (id: string, pos: Position) => void;
  updateTable: (table: ERDTable) => void;
  deleteTable: (tableId: ERDTable['id']) => void;
  createColumn: (table: ERDTable, isPK: boolean) => void;
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
  deleteColumn: (table: ERDTable, column: ERDColumn) => void;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const editRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingColumns, setIsEditingColumns] = useState(false);

  const pkColumns = table.columns.filter((val) => val.keyType === 'pk');
  const pfkColumns = table.columns.filter((val) => val.keyType === 'pk/fk');
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

  const handleMenuItemClick = (
    action: 'delete' | 'add/pk' | 'add' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        deleteTable(table.id);
        break;
      case 'add/pk':
        createColumn(table, true);
        break;
      case 'add':
        createColumn(table, false);
        break;
      case 'edit':
        setIsEditingColumns(true);
        break;
      default:
        break;
    }

    setMenuOpen(false);
  };

  return (
    <styles.displayWrapper
      ref={boxRef}
      onClick={() => onClick(table)}
      onMouseDown={handleMouseDown}
      $name={table.title}
      $pos={{ left: table.left, top: table.top }}
    >
      {pkColumns.map((column) => (
        <styles.columnWrapper key={column.id}>
          <styles.columnName>{column.name}</styles.columnName>
          {column.type && <styles.columnType>{column.type}</styles.columnType>}
          {column.keyType && (
            <styles.columnKeyType>
              {column.keyType.toUpperCase()}
            </styles.columnKeyType>
          )}
          {column.nullable && (
            <styles.columnNullable>NULL</styles.columnNullable>
          )}
        </styles.columnWrapper>
      ))}
      {pfkColumns.map((column) => (
        <styles.columnWrapper key={column.id}>
          <styles.columnName>{column.name}</styles.columnName>
          {column.type && <styles.columnType>{column.type}</styles.columnType>}
          {column.keyType && (
            <styles.columnKeyType>
              {column.keyType.toUpperCase()}
            </styles.columnKeyType>
          )}
          {column.nullable && (
            <styles.columnNullable>NULL</styles.columnNullable>
          )}
        </styles.columnWrapper>
      ))}
      {(pkColumns.length > 0 || pfkColumns.length > 0) &&
        (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
      {columns.map((column) => (
        <styles.columnWrapper key={column.id}>
          <styles.columnName>{column.name}</styles.columnName>
          {column.type && <styles.columnType>{column.type}</styles.columnType>}
          {column.keyType && (
            <styles.columnKeyType>
              {column.keyType.toUpperCase()}
            </styles.columnKeyType>
          )}
          {column.nullable && (
            <styles.columnNullable>NULL</styles.columnNullable>
          )}
        </styles.columnWrapper>
      ))}
      {fkColumns.map((column) => (
        <styles.columnWrapper key={column.id}>
          <styles.columnName>{column.name}</styles.columnName>
          {column.type && <styles.columnType>{column.type}</styles.columnType>}
          {column.keyType && (
            <styles.columnKeyType>
              {column.keyType.toUpperCase()}
            </styles.columnKeyType>
          )}
          {column.nullable && (
            <styles.columnNullable>NULL</styles.columnNullable>
          )}
        </styles.columnWrapper>
      ))}
      <styles.menuIcon onClick={toggleMenu}>
        <svg width='18' height='18' viewBox='0 0 24 24'>
          <path d={ellipsisIconPath} fill='#ededed' />
        </svg>
      </styles.menuIcon>

      {menuOpen && (
        <styles.menu ref={menuRef}>
          <styles.menuItem onClick={() => handleMenuItemClick('delete')}>
            테이블 삭제
          </styles.menuItem>
          <styles.menuItem onClick={() => handleMenuItemClick('add/pk')}>
            컬럼 추가(pk)
          </styles.menuItem>
          <styles.menuItem onClick={() => handleMenuItemClick('add')}>
            컬럼 추가
          </styles.menuItem>
          <styles.menuItem onClick={() => handleMenuItemClick('edit')}>
            컬럼 수정
          </styles.menuItem>
        </styles.menu>
      )}
      {isEditingColumns && (
        <ColumnEditMenu
          editRef={editRef}
          tableColumns={table.columns}
          table={table}
          updateColumn={updateColumn}
          deleteColumn={deleteColumn}
        />
      )}
    </styles.displayWrapper>
  );
}

// Google Material Icons의 more_vert 아이콘 path
const ellipsisIconPath =
  'M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z';

const styles = {
  displayWrapper: styled.div<{
    $name: string;
    $pos: Position;
  }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 50px;
    min-height: 30px;
    position: absolute;
    left: ${({ $pos }) => `${$pos.left}px`};
    top: ${({ $pos }) => `${$pos.top}px`};
    display: inline-flex;
    border: 0.5px solid #606060;
    background: rgba(34, 34, 34, 0.7);
    flex-direction: column;
    padding: 10px;
    font-size: 12px;
    color: #ededed;
    cursor: pointer;

    &::before {
      content: ${({ $name }) => `"${$name}"`};
      position: absolute;
      left: 3px;
      top: -20px;
    }

    &:hover {
      color: #fff;
    }
  `,
  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
  `,
  columnWrapper: styled.div`
    display: flex;
    font-size: 12px;
    color: #ededed;
  `,
  columnName: styled.div`
    margin-left: 5px;
    margin-right: 10px;
  `,
  columnType: styled.div`
    margin-right: 10px;
  `,
  columnKeyType: styled.div`
    color: #ddff00;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  `,
  columnNullable: styled.div`
    color: #ff6200;
    margin-right: 10px;
  `,
  menuIcon: styled.div`
    position: absolute;
    top: -20px;
    right: -5px;
    cursor: pointer;
  `,
  menu: styled.div`
    position: absolute;
    top: 0px;
    right: 5px;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1;
  `,
  menuItem: styled.div`
    padding: 8px 16px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  `,
};
