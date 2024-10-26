'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Columns } from './Columns';
import { styles } from './Table.styles';
import { TableMenu } from './TableMenu';

import { ColumnEditMenu } from '@/components/column-edit';
import { MenuIcon } from '@/components/implements-icon';
import { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

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
  const updateTable = useERDProjectStore((state) => state.updateTable);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const editRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingColumns, setIsEditingColumns] = useState(false);

  const pkColumns = table.columns.filter((val) => val.keyType === 'PK');
  const pkfkColumns = table.columns.filter((val) => val.keyType === 'PK/FK');
  const fkColumns = table.columns.filter((val) => val.keyType === 'FK');
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
  }, [table, updateTable]);

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
          left: e.pageX - offset.left,
          top: e.pageY - offset.top,
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
        <Columns columns={pkColumns} />
        <Columns columns={pkfkColumns} />
        {(pkColumns.length > 0 || pkfkColumns.length > 0) &&
          (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
        <Columns columns={columns} />
        <Columns columns={fkColumns} />

        {menuOpen && (
          <TableMenu
            menuRef={menuRef}
            table={table}
            setIsEditingColumns={setIsEditingColumns}
            setMenuOpen={setMenuOpen}
          />
        )}
        {isEditingColumns && (
          <ColumnEditMenu
            editRef={editRef}
            tableColumns={table.columns}
            table={table}
          />
        )}
      </styles.container>
    </styles.displayWrapper>
  );
}
