import styled from '@emotion/styled';

export const styles = {
  displayWrapper: styled.div<{ $pos: { width: number; height: number } }>`
    position: relative;
    width: 100%;
    height: 100%;
  `,

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
