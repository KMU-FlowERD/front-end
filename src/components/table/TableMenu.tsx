import { styles } from './TableMenu.styles';

import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { useTableContext } from '@/providers/TableProvider';

export function TableMenu() {
  const { menuRef, table, menuOpen, setIsEditingColumns, setMenuOpen } = useTableContext();
  const deleteTable = useERDProjectStore((state) => state.deleteTable);

  const createColumn = useERDProjectStore((state) => state.createColumn);

  const { schema } = useDiagramContext();

  const handleMenuItemClick = (action: 'delete' | 'add/pk' | 'add' | 'edit') => {
    if (schema === undefined) return;

    switch (action) {
      case 'delete':
        deleteTable(schema.name, table.id);
        break;
      case 'add/pk':
        createColumn(schema.name, table, true);
        break;
      case 'add':
        createColumn(schema.name, table, false);
        break;
      case 'edit':
        setIsEditingColumns(true);
        break;
      default:
        break;
    }

    setMenuOpen(false);
  };

  if (!menuOpen) return null;

  return (
    <styles.menu ref={menuRef}>
      <styles.menuItem onClick={() => handleMenuItemClick('delete')}>테이블 삭제</styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('add/pk')}>컬럼 추가(pk)</styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('add')}>컬럼 추가</styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('edit')}>컬럼 수정</styles.menuItem>
    </styles.menu>
  );
}
