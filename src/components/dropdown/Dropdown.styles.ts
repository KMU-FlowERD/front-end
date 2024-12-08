import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    position: relative;
    width: 200px;
  `,

  button: styled.button`
    width: 100%;
    padding: 10px;
    background-color: #ededed;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  `,

  list: styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #ededed;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    max-height: 150px;
    overflow-y: auto;
    z-index: 50;
  `,

  item: styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #bbb;
    }
  `,
};
