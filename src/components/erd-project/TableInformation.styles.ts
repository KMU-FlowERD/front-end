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
    justify-content: end;
    font-size: 18px;
    gap: 10px;
    margin-bottom: 0.5rem;
  `,

  addSchemaButton: styled.button`
    all: unset;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    background-color: transparent;

    cursor: pointer;

    &:hover {
      background-color: #2d2d2d;
    }
  `,

  addDiagramButton: styled.button`
    all: unset;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    background-color: transparent;

    &:hover {
      background-color: #2d2d2d;
    }
  `,

  childMargin: styled.div`
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  `,

  editInput: styled.input`
    all: unset;
    font-size: 14px;
    background-color: #444;
    width: 100%;
    padding: 0 0.5rem;
    border-radius: 4px;
  `,
};
