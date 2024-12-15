import { TbRelationOneToOneFilled } from 'react-icons/tb';

import { styles } from './icon.styles';

export function NonIdentifyOneToOneIcon({ fill }: { fill: string }) {
  return (
    <styles.relationPath>
      <TbRelationOneToOneFilled size={32} color={fill} />
    </styles.relationPath>
  );
}
