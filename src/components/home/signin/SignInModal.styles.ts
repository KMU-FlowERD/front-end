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
    gap: 1rem;
    flex: 1 0 0;

    border-radius: 1rem;
    border: 1px solid #676772;
    background: #27272a;
  `,
  input: styled.input`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #676772;
    background: #1f1f23;
    color: #ffffff;
  `,
  button: styled.button`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background: #4a4a57;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: #5a5a67;
    }
  `,
  toggleText: styled.span`
    margin-top: 1rem;
    color: #4a4a57;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #5a5a67;
    }
  `,
};
