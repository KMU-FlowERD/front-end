'use client';

import styled from '@emotion/styled';

import { MappingType, useDrawToolsStore } from '@/features/draw-tools';

export function RelationshipIcons({ type }: { type: MappingType }) {
  const { mapping, setMapping } = useDrawToolsStore();
  const fill = mapping === type ? '#ddd' : '#aaa';

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

function Icon(type: MappingType, fill: string) {
  switch (type) {
    case 'IdentifyOneToOne':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IdentifyOneToMany':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IdentifyManyToMany':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyOneToOne':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyOneToMany':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyManyToMany':
      return (
        <svg width='24' height='24'>
          <styles.pathStyle width='24' height='24' fill={fill} />
        </svg>
      );
    default:
      break;
  }
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
