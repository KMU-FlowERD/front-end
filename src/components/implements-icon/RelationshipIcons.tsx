'use client';

import { styles } from './icon.styles';
import { IdentifyManyToManyIcon } from './IdentifyManyToManyIcon';
import { IdentifyOneToManyIcon } from './IdentifyOneToManyIcon';
import { IdentifyOneToOneIcon } from './IdentifyOneToOneIcon';
import { NonIdentifyManyToManyIcon } from './NonIdentifyManyToManyIcon';
import { NonIdentifyOneToManyIcon } from './NonIdentifyOneToManyIcon';
import { NonIdentifyOneToOneIcon } from './NonIdentifyOneToOneIcon';

import type { MappingType } from '@/features/draw-tools';
import { useDrawToolsStore } from '@/features/draw-tools';

export function RelationshipIcons({ type }: { type: MappingType }) {
  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const fill =
    mapping?.identify === type.identify &&
    mapping.cardinality.from === type.cardinality.from &&
    mapping.cardinality.to === type.cardinality.to
      ? '#ddd'
      : '#aaa';

  return (
    <styles.relationContainer
      onClick={() => {
        setMapping(type);
      }}
    >
      <Icon mapping={type} fill={fill} />
    </styles.relationContainer>
  );
}

function Icon({ mapping, fill }: { mapping: MappingType; fill: string }) {
  const { identify, cardinality } = mapping;

  if (identify && cardinality.from === 'ONE' && cardinality.to === 'ONE')
    return <IdentifyOneToOneIcon fill={fill} />;
  if (identify && cardinality.from === 'ONE' && cardinality.to === 'MANY')
    return <IdentifyOneToManyIcon fill={fill} />;
  if (identify && cardinality.from === 'MANY' && cardinality.to === 'MANY')
    return <IdentifyManyToManyIcon fill={fill} />;
  if (!identify && cardinality.from === 'ONE' && cardinality.to === 'ONE')
    return <NonIdentifyOneToOneIcon fill={fill} />;
  if (!identify && cardinality.from === 'ONE' && cardinality.to === 'MANY')
    return <NonIdentifyOneToManyIcon fill={fill} />;
  if (!identify && cardinality.from === 'MANY' && cardinality.to === 'MANY')
    return <NonIdentifyManyToManyIcon fill={fill} />;
}
