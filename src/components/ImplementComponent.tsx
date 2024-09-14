'use client';

import styled from '@emotion/styled';

export function ImplementComponent() {
  return <styles.container></styles.container>;
}

const styles = {
  container: styled.div`
    display: flex;
    height: 111px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: #222;
  `,
};
