import { styles } from './RelationshipMenu.styles';

import { useERDProjectStore } from '@/providers';
import { useMappingContext } from '@/providers/MappingProvider';

export function RelationshipMenu() {
  const {
    lastRelation: relation,
    menuRef,
    contextMenu,
    closeContextMenu,
  } = useMappingContext();

  const deleteRelation = useERDProjectStore((state) => state.deleteRelation);
  const updateRelation = useERDProjectStore((state) => state.updateRelation);

  const fromMultiplicity =
    relation &&
    relation.participation &&
    relation.participation.from &&
    relation.participation.from === 'OPTIONAL'
      ? 'FULL'
      : 'OPTIONAL';

  const toMultiplicity =
    relation &&
    relation.participation &&
    relation.participation.to &&
    relation.participation.to === 'OPTIONAL'
      ? 'FULL'
      : 'OPTIONAL';

  const handleMenuItemClick = (
    action: 'delete' | 'fromNullable' | 'toNullable',
  ) => {
    if (!relation) return;

    if (action === 'delete') {
      deleteRelation(relation);
    } else if (action === 'fromNullable') {
      updateRelation({
        ...relation,
        participation: { ...relation.participation, from: fromMultiplicity },
      });
    } else if (action === 'toNullable') {
      updateRelation({
        ...relation,
        participation: { ...relation.participation, to: toMultiplicity },
      });
    }

    closeContextMenu();
  };

  if (!contextMenu) return null;

  return (
    <styles.menu
      ref={menuRef}
      $pos={{ left: contextMenu.x, top: contextMenu.y }}
    >
      <styles.menuItem onClick={() => handleMenuItemClick('delete')}>
        관계 삭제
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('fromNullable')}>
        {fromMultiplicity === 'FULL' ? '✔️' : ''}부모 null 허용
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('toNullable')}>
        {toMultiplicity === 'FULL' ? '✔️' : ''}자식 null 허용
      </styles.menuItem>
    </styles.menu>
  );
}
