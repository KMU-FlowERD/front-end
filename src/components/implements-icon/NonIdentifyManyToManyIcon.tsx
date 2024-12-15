import { TbRelationManyToManyFilled } from 'react-icons/tb';

import { styles } from './icon.styles';

export function NonIdentifyManyToManyIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationManyToManyFilled size={32} color={fill} />
    </styles.relationPath>
  );
}
