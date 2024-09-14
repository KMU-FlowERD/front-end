'use client';

import {
  TableComponent,
  ImplementComponent,
  RelationComponent,
} from '@/components';
import styled from '@emotion/styled';

export function ErdProjectPage() {
  return (
    <styles.container>
      <TableComponent />
      <ImplementComponent />
      <RelationComponent />
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
