import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    color: #ededed;
    background: #27272a;
    align-items: end;
    padding: 32px;
    border: 1px solid #444;
    border-radius: 16px;
    gap: 20px;
    z-index: 30;
    max-height: 400px;
    overflow-y: auto;
  `,

  relationWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
  `,

  changeButton: styled.div`
    background-color: #ededed;
    color: #222;
    justify-content: center;
    align-items: center;
    padding: 3px 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
  `,

  middleText: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  `,
};
