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
    relation.multiplicity &&
    relation.multiplicity.from &&
    relation.multiplicity.from === 'OPTIONAL'
      ? 'MANDATORY'
      : 'OPTIONAL';

  const toMultiplicity =
    relation &&
    relation.multiplicity &&
    relation.multiplicity.to &&
    relation.multiplicity.to === 'OPTIONAL'
      ? 'MANDATORY'
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
        multiplicity: { ...relation.multiplicity, from: fromMultiplicity },
      });
    } else if (action === 'toNullable') {
      updateRelation({
        ...relation,
        multiplicity: { ...relation.multiplicity, to: toMultiplicity },
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
        {fromMultiplicity === 'MANDATORY' ? '✔️' : ''}부모 null 허용
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('toNullable')}>
        {toMultiplicity === 'MANDATORY' ? '✔️' : ''}자식 null 허용
      </styles.menuItem>
    </styles.menu>
  );
}