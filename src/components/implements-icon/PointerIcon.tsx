'use client';

import styled from '@emotion/styled';

import { useDrawToolsStore } from '@/features/draw-tools';

export function PointerIcon() {
  const cursor = useDrawToolsStore((state) => state.cursor);
  const setCursor = useDrawToolsStore((state) => state.setCursor);

  const fill = cursor === 'POINTER' ? '#ddd' : '#aaa';

  return (
    <styles.container
      onClick={() => {
        setCursor('POINTER');
      }}
    >
      <Icon fill={fill} />
    </styles.container>
  );
}

function Icon({ fill }: { fill: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
    >
      <g clipPath='url(#clip0_29_2)'>
        <styles.pathStyle
          d='M13 24.5C9.74001 24.5 6.81001 22.51 5.60001 19.48L2.57001 11.87C2.26001 11.08 3.00001 10.29 3.81001 10.55L4.60001 10.81C5.16001 10.99 5.62001 11.42 5.84001 11.97L7.25001 15.5H8.00001V3.75C8.00001 3.06 8.56001 2.5 9.25001 2.5C9.94001 2.5 10.5 3.06 10.5 3.75V12.5H11.5V1.75C11.5 1.06 12.06 0.5 12.75 0.5C13.44 0.5 14 1.06 14 1.75V12.5H15V3.25C15 2.56 15.56 2 16.25 2C16.94 2 17.5 2.56 17.5 3.25V12.5H18.5V6.25C18.5 5.56 19.06 5 19.75 5C20.44 5 21 5.56 21 6.25V16.5C21 20.92 17.42 24.5 13 24.5Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_29_2'>
          <rect width='24' height='24' transform='translate(0 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
}

const styles = {
  container: styled.div`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  pathStyle: styled.path`
    &:hover {
      fill: #ddd;
    }
  `,
};
