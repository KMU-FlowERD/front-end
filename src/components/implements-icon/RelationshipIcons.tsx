'use client';

import styled from '@emotion/styled';

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

  if (identify && type === 'one-to-one')
    return <IdentifyOneToOneIcon fill={fill} />;
  if (identify && type === 'one-to-many')
    return <IdentifyOneToManyIcon fill={fill} />;
  if (identify && type === 'many-to-many')
    return <IdentifyManyToManyIcon fill={fill} />;
  if (!identify && type === 'one-to-one')
    return <NonIdentifyOneToOneIcon fill={fill} />;
  if (!identify && type === 'one-to-many')
    return <NonIdentifyOneToManyIcon fill={fill} />;
  if (!identify && type === 'many-to-many')
    return <NonIdentifyManyToManyIcon fill={fill} />;
}

const styles = {
  container: styled.rect`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
