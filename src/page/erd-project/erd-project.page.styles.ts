import styled from '@emotion/styled';

export const styles = {
  displayWrapper: styled.div<{ $pos: { width: number; height: number } }>`
    position: relative;
    width: ${({ $pos }) => `${$pos.width}px`};
    height: ${({ $pos }) => `${$pos.height}px`};
    background: #2f2f2f;
  `,
  container: styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 16px;
    align-items: flex-end;
    gap: 16px;
    background: transparent;
    pointer-events: none;
    z-index: 2;
  `,
};
