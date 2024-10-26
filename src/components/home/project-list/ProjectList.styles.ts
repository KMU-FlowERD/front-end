import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    flex: 1 0 0;
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  `,

  searchOptions: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
  `,

  searchTextInput: styled.input`
    display: flex;
    padding: 0.625rem;
    align-items: center;
    gap: 0.625rem;
    flex: 1 0 0;

    border-radius: 0.25rem;
    border: 1px solid #676772;
    background: #27272a;

    color: #fff;
    font-family: Pretendard, sans-serif;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  button: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    width: 6rem;
    padding: 0.625rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    flex-shrink: 0;

    border-radius: 0.25rem;
    border: 1px solid #676772;
    background: #27272a;

    color: #fff;
    font-family: Pretendard, sans-serif;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
};
