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
    case 'IOBO':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IOBM':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'IMBM':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NIOBO':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NIOBM':
      return (
        <svg width='24' height='24'>
          <rect width='24' height='24' fill={fill} />
        </svg>
      );
    case 'NIMBM':
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
