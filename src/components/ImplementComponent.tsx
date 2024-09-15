'use client';

import styled from '@emotion/styled';
import { ArrowIcon, PointerIcon, TableIcon, MemoIcon } from './implements-icon';

export function ImplementComponent() {
  return (
    <styles.container>
      <PointerIcon />
      <ArrowIcon />
      <TableIcon />
      <MemoIcon />
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
