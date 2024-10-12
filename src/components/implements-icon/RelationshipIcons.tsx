'use client';

import styled from '@emotion/styled';

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
      {Icon(type, fill)}
    </styles.container>
  );
}

function Icon(mapping: MappingType, fill: string) {
  const { identify, type } = mapping;

  if (identify && type === 'one-to-one')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
  if (identify && type === 'one-to-many')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
  if (identify && type === 'many-to-many')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
  if (!identify && type === 'one-to-one')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
  if (!identify && type === 'one-to-many')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
  if (!identify && type === 'many-to-many')
    return (
      <svg width='24' height='24'>
        <styles.pathStyle width='24' height='24' fill={fill} />
      </svg>
    );
}

const styles = {
  container: styled.rect`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  pathStyle: styled.rect`
    &:hover {
      fill: #ddd;
    }
  `,
};
