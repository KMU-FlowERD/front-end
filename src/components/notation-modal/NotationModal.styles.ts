import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    color: #ededed;
    background: #222;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid #444;
    gap: 20px;
    z-index: 30;
  `,

  relationWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
  `,

  dropdownWrapper: styled.div`
    width: 100px;
    height: 30px;
    background: #222;
    border: 1px solid #444;
  `,

  dropdown: styled.li`
    width: 100px;
    height: 30px;
    background: #222;
    justify-content: center;
    align-items: center;
  `,
};
