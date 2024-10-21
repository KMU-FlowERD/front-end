import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

import { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

interface TableMenuProps {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  table: ERDTable;
  setIsEditingColumns: (isEditingColumns: boolean) => void;
  setMenuOpen: (menuOpen: boolean) => void;
}

export function TableMenu({
  menuRef,
  table,
  setIsEditingColumns,
  setMenuOpen,
}: TableMenuProps) {
  const deleteTable = useERDProjectStore((state) => state.deleteTable);

  const createColumn = useERDProjectStore((state) => state.createColumn);

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
  );
}

const styles = {
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
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  `,
};
