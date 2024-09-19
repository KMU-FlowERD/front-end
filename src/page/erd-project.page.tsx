'use client';

import styled from '@emotion/styled';

import { TableMenu, ErdDrawTools, RelationshipMenu } from '@/components';

export function ErdProjectPage() {
  return (
    <styles.container>
      <TableMenu />
      <ErdDrawTools />
      <RelationshipMenu />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 16px;
    align-items: flex-end;
    gap: 16px;
    background: #2f2f2f;
  `,
};
