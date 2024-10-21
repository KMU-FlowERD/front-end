import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;

    border-radius: 0.5rem;
    border: 1px solid #676772;
    background: #27272a;
  `,

  projectInformation: styled.div`
    display: flex;
    padding: 0.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    flex: 1 0 0;
    align-self: stretch;
  `,

  projectTitle: styled.p`
    color: #fff;
    font-family: Pretendard, sans-serif;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  projectDescription: styled.p`
    color: #ededed;
    font-family: Pretendard, sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  projectLastUpdated: styled.p`
    color: #eee;
    font-family: Pretendard, sans-serif;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
};
