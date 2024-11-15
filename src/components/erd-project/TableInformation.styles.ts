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
    padding: 10px;
    font-size: 14px;
    color: #ededed;
  `,

  buttonWrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
    font-size: 18px;
    gap: 10px;
  `,

  addSchemaButton: styled.div`
    cursor: pointer;
  `,

  addDiagramButton: styled.div`
    cursor: pointer;
  `,
};
