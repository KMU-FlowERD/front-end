import { styles } from './NotationModal.styles';

import { ERDRelation } from '@/features/erd-project';

export function NotationModal({ relations }: { relations: ERDRelation[] }) {
  return (
    <styles.container>
      if you change notation set default type
      {relations.map((relation) => (
        <input key={relation.id} defaultValue={relation.id} />
      ))}
    </styles.container>
  );
}
