import styled from '@emotion/styled';

export const styles = {
  menu: styled.div<{ $left: number; $top: number }>`
    position: absolute;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 3;
    left: ${({ $left }) => `${$left}px`};
    top: ${({ $top }) => `${$top}px`};
  `,

  menuItem: styled.div`
    padding: 8px 16px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  `,
};
