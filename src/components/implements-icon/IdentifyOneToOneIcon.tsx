import { TbRelationOneToOne } from 'react-icons/tb';

import { styles } from './icon.styles';

export function IdentifyOneToOneIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationOneToOne size={32} color={fill} />
    </styles.relationPath>
  );
}
