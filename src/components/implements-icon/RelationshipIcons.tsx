'use client';

import { styles } from './icon.styles';
import { IdentifyManyToManyIcon } from './IdentifyManyToManyIcon';
import { IdentifyOneToManyIcon } from './IdentifyOneToManyIcon';
import { IdentifyOneToOneIcon } from './IdentifyOneToOneIcon';
import { NonIdentifyManyToManyIcon } from './NonIdentifyManyToManyIcon';
import { NonIdentifyOneToManyIcon } from './NonIdentifyOneToManyIcon';
import { NonIdentifyOneToOneIcon } from './NonIdentifyOneToOneIcon';

import { MappingType, useDrawToolsStore } from '@/features/draw-tools';

export function RelationshipIcons({ type }: { type: MappingType }) {
  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const fill =
    mapping?.identify === type.identify && mapping.type === type.type
      ? '#ddd'
      : '#aaa';

  return (
    <styles.container
      onClick={() => {
        setMapping(type);
      }}
    >
      <Icon mapping={type} fill={fill} />
    </styles.container>
  );
}

function Icon({ mapping, fill }: { mapping: MappingType; fill: string }) {
  const { identify, type } = mapping;

  if (identify && type === 'ONE-TO-ONE')
    return <IdentifyOneToOneIcon fill={fill} />;
  if (identify && type === 'ONE-TO-MANY')
    return <IdentifyOneToManyIcon fill={fill} />;
  if (identify && type === 'MANY-TO-MANY')
    return <IdentifyManyToManyIcon fill={fill} />;
  if (!identify && type === 'ONE-TO-ONE')
    return <NonIdentifyOneToOneIcon fill={fill} />;
  if (!identify && type === 'ONE-TO-MANY')
    return <NonIdentifyOneToManyIcon fill={fill} />;
  if (!identify && type === 'MANY-TO-MANY')
    return <NonIdentifyManyToManyIcon fill={fill} />;
}
