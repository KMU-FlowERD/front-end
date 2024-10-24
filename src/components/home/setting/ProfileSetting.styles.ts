import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    display: flex;
    min-width: 20rem;
    max-width: 30rem;
    min-height: 20rem;
    max-height: 30rem;
    padding: 2rem;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex: 1 0 0;

    border-radius: 1rem;
    border: 1px solid #676772;
    background: #27272a;
  `,

  profileInformationContainer: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,

  profileImageFrame: styled.div`
    width: 9.375rem;
    height: 9.375rem;

    border-radius: 10.9375rem;
    border: 1px solid #000;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  `,

  profileInformation: styled.div`
    display: flex;
    width: 15.625rem;
    height: 16rem;
    padding: 0.625rem;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  `,

  profileName: styled.p`
    align-self: stretch;
    color: #ededed;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  profileDescription: styled.p`
    flex: 1 0 0;
    align-self: stretch;

    color: #dedede;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  buttons: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
  `,

  confirmButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;

    border-radius: 0.25rem;
    background: #444;

    color: #ededed;
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  cancelButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;

    border-radius: 0.25rem;
    background: #2f2f2f;

    color: #ededed;
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};
