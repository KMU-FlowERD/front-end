import styled from '@emotion/styled';

export const styles = {
  wrapper: styled.div<{ $left: number; $top: number }>`
    position: absolute;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 16px;
    width: 400px;
    z-index: 3;
    left: ${({ $left }) => `${$left}px`};
    top: ${({ $top }) => `${$top}px`};
    width: fit-content;
  `,

  title: styled.input`
    background: #444;
    border: none;
    padding: 8px;
    color: #ededed;
    width: 150px;
    margin-bottom: 8px;

    &::placeholder {
      color: #888;
    }
  `,

  input: styled.input`
    background: #444;
    border: none;
    padding: 8px;
    color: #ededed;
    margin-right: 8px;
    width: 150px;

    &::placeholder {
      color: #888;
    }
  `,

  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 8px;
  `,
};
