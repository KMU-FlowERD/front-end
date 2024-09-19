'use client';

import styled from '@emotion/styled';

import { IconType } from './icon.type';

export function RelationshipIcons({
  type,
  fill,
}: {
  type: IconType;
  fill: string;
}) {
  return <styles.container>{Icon(type, fill)}</styles.container>;
}

function Icon(type: IconType, fill: string) {
  switch (type) {
    case 'IdentifyOneToOne':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IdentifyOneToMany':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IdentifyManyToMany':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyOneToOne':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyOneToMany':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NonIdentifyManyToMany':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    default:
      break;
  }
}

const styles = {
  container: styled.div`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
