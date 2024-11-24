import { TbRelationOneToMany } from 'react-icons/tb';

import { styles } from './icon.styles';

export function IdentifyOneToManyIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationOneToMany size={32} color={fill} />
    </styles.relationPath>
  );
}
