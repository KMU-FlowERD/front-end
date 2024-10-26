import styled from '@emotion/styled';

export const styles = {
  columnRow: styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
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
};
