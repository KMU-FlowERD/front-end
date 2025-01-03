import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    position: relative;
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
    pointer-events: all;
    font-size: 12px;
    color: #ededed;
  `,

  identifyWrapper: styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  `,
};
