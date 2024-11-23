import { styles } from './RelationshipMenu.styles';

import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { useMappingContext } from '@/providers/MappingProvider';

export function RelationshipMenu() {
  const {
    lastRelation: relation,
    menuRef,
    contextMenu,
    closeContextMenu,
  } = useMappingContext();

  const { schema } = useDiagramContext();

  const deleteRelation = useERDProjectStore((state) => state.deleteRelation);
  const updateRelation = useERDProjectStore((state) => state.updateRelation);

  const fromMultiplicity =
    relation &&
    relation.participation &&
    relation.participation.from &&
    relation.participation.from === 'PARTIAL'
      ? 'FULL'
      : 'PARTIAL';

  const toMultiplicity =
    relation &&
    relation.participation &&
    relation.participation.to &&
    relation.participation.to === 'PARTIAL'
      ? 'FULL'
      : 'PARTIAL';

  const handleMenuItemClick = (
    action: 'delete' | 'identify' | 'fromNullable' | 'toNullable',
  ) => {
    if (!relation) return;

    if (schema === undefined) return;

    if (action === 'delete') {
      deleteRelation(schema.name, relation);
    } else if (action === 'identify') {
      updateRelation(schema.name, {
        ...relation,
        identify: !relation.identify,
      });
    } else if (action === 'fromNullable') {
      updateRelation(schema.name, {
        ...relation,
        participation: { ...relation.participation, from: fromMultiplicity },
      });
    } else if (action === 'toNullable') {
      updateRelation(schema.name, {
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
      <styles.menuItem onClick={() => handleMenuItemClick('identify')}>
        {relation?.identify ? '비' : ''}식별로 전환
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('fromNullable')}>
        {fromMultiplicity === 'FULL' ? '✔️' : ''}부모 null 허용
      </styles.menuItem>
      {!relation?.identify && (
        <styles.menuItem onClick={() => handleMenuItemClick('toNullable')}>
          {toMultiplicity === 'FULL' ? '✔️' : ''}자식 null 허용
        </styles.menuItem>
      )}
    </styles.menu>
  );
}
