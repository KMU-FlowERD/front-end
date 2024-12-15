import styled from '@emotion/styled';

export const styles = {
  columnRow: styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    gap: 5px;
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

  deleteButton: styled.button`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    background: none;
    border: none;
    color: #ededed;
    cursor: pointer;
    font-size: 18px;
    padding-right: 5px;
  `,

  notNullText: styled.div`
    margin-left: auto;
    color: #ededed;
    font-size: 14px;
    margin-right: 5px;
  `,
};
