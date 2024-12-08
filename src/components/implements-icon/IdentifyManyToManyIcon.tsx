import { TbRelationManyToMany } from 'react-icons/tb';

import { styles } from './icon.styles';

export function IdentifyManyToManyIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationManyToMany size={32} color={fill} />
    </styles.relationPath>
  );
}
