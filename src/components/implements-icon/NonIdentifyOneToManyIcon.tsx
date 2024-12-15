import { TbRelationOneToManyFilled } from 'react-icons/tb';

import { styles } from './icon.styles';

export function NonIdentifyOneToManyIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationOneToManyFilled size={32} color={fill} />
    </styles.relationPath>
  );
}
