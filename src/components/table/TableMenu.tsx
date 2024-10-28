import { MutableRefObject } from 'react';

import { styles } from './TableMenu.styles';

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
