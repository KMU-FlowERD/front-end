'use client';

import styled from '@emotion/styled';

import { useDrawToolsStore } from '@/features/draw-tools';

export function MemoIcon() {
  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);

  const fill = entity === 'memo' ? '#ddd' : '#aaa';

  return (
    <styles.container
      onClick={() => {
        setEntity('memo');
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
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <g id='Layer_Grid' />
      <g id='Layer_2'>
        <styles.pathStyle
          d='M9,2C8.4,2,8,2.4,8,3v1.1C6.3,4.6,5,6.1,5,8v3c-1.7,0-3,1.3-3,3s1.3,3,3,3c0,2.2,1.8,4,4,4h7c2.2,0,4-1.8,4-4v-3.1V8   c0-1.9-1.3-3.4-3-3.9V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1h-5V3C10,2.4,9.6,2,9,2z M6,15H5c-0.6,0-1-0.4-1-1s0.4-1,1-1h1h7   c0.6,0,1,0.4,1,1c0,0.2,0,0.4,0.1,0.6c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2,0.1,0.3H6z M18,17c0,1.1-0.9,2-2,2H9c-1.1,0-2-0.9-2-2h10   c0.1,0,0.2,0,0.3,0c0.3,0,0.5-0.1,0.7-0.2V17z M16,6c1.1,0,2,0.9,2,2v5.9c0,0.6-0.4,1.1-0.9,1.1c-0.1,0-0.2,0-0.3,0   c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.1-0.4-0.2C16.1,14.5,16,14.3,16,14c0-1.7-1.3-3-3-3H7V8c0-1.1,0.9-2,2-2H16z'
          fill={fill}
        />
      </g>
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
