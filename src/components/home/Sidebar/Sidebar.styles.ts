import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    width: 18.75rem;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    align-self: stretch;

    border-right: 1px solid #676772;
  `,

  profileImageFrame: styled.div`
    all: unset;

    width: 12.5rem;
    height: 12.5rem;

    border-radius: 10.9375rem;
    border: 1px solid #000;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  `,

  userInformation: styled.div`
    display: flex;
    padding: 0.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
  `,

  userName: styled.p`
    color: #ededed;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  userDescription: styled.p`
    color: #dedede;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  settingLink: styled.a`
    all: unset;
    cursor: pointer;

    color: #aaa;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:hover {
      text-decoration: underline;
    }
  `,
};
