'use client';

import styled from '@emotion/styled';

export function RelationshipMenu() {
  return <styles.container />;
}

const styles = {
  container: styled.div`
    display: flex;
    width: 200px;
    height: 100%;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: #222;
    z-index: 1;
  `,
};
