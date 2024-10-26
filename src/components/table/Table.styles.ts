import styled from '@emotion/styled';

interface Position {
  left: number;
  top: number;
}

export const styles = {
  displayWrapper: styled.div<{ $pos: Position }>`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: ${({ $pos }) => `${$pos.left}px`};
    top: ${({ $pos }) => `${$pos.top - 20}px`};
    z-index: 1;
  `,

  titleMenuWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,

  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 50px;
    min-height: 30px;
    border: 0.5px solid #606060;
    background: rgba(34, 34, 34, 0.7);
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  `,

  tableTitle: styled.div`
    font-size: 12px;
    color: #ededed;
    flex-grow: 1;
    justify-items: start;
    margin-right: 10px;
    width: 100%;
    left: 0;
    top: -20px;
  `,

  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
  `,
};
