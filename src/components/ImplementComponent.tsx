'use client';

import styled from '@emotion/styled';

import {
  ArrowIcon,
  PointerIcon,
  TableIcon,
  MemoIcon,
  IconComponent,
} from './implements-icon';

export function ImplementComponent() {
  return (
    <styles.container>
      <IconComponent iconShape={PointerIcon} />
      <IconComponent iconShape={ArrowIcon} />
      <div
        style={{
          width: '1px',
          height: '40px',
          background: '#444',
          marginRight: '7px',
        }}
      />
      <IconComponent iconShape={TableIcon} />
      <IconComponent iconShape={MemoIcon} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    height: 111px;
    padding: 16px;
    justify-content: start;
    align-items: center;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: #222;
  `,
};
