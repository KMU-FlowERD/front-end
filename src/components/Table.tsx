'use client';

import styled from '@emotion/styled';
import { useRef, useState, useEffect } from 'react';

import { ERDTable } from '@/features/erd-project';

interface Position {
  left: number;
  top: number;
}

export function Table({
  table,
  onPositionChange,
}: {
  table: ERDTable;
  onPositionChange: (id: string, pos: Position) => void;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !boxRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

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

  const handleMenuItemClick = (action: string) => {
    console.log(action);
    setMenuOpen(false);
  };

  return (
    <styles.displayWrapper
      ref={boxRef}
      onMouseDown={handleMouseDown}
      $name={table.title}
      $pos={{ left: table.left, top: table.top }}
    >
      <styles.MenuIcon onClick={toggleMenu}>
        <svg width='18' height='18' viewBox='0 0 24 24'>
          <path d={ellipsisIconPath} fill='#ededed' />
        </svg>
      </styles.MenuIcon>

      {menuOpen && (
        <styles.Menu ref={menuRef}>
          <styles.MenuItem onClick={() => handleMenuItemClick('컬럼 추가')}>
            컬럼 추가
          </styles.MenuItem>
          <styles.MenuItem onClick={() => handleMenuItemClick('컬럼 수정')}>
            컬럼 수정
          </styles.MenuItem>
        </styles.Menu>
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
    min-width: 100px;
    min-height: 50px;
    position: absolute;
    left: ${({ $pos }) => `${$pos.left}px`};
    top: ${({ $pos }) => `${$pos.top}px`};
    display: inline-flex;
    border: 0.5px solid #606060;
    background: rgba(34, 34, 34, 0.7);
    flex-direction: column;
    padding: 5px;
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
  MenuIcon: styled.div`
    position: absolute;
    top: -20px;
    right: -5px;
    cursor: pointer;
  `,
  Menu: styled.div`
    position: absolute;
    top: 25px;
    right: 5px;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 100;
  `,
  MenuItem: styled.div`
    padding: 8px 16px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  `,
};
