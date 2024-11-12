import styled from '@emotion/styled';

export const styles = {
  displayWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    color: #ededed;
  `,

  mainNode: styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #ededed;
    gap: 4px;
    cursor: pointer;
  `,

  childNode: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-left: 8px;
    font-size: 14px;
    color: #ededed;
  `,

  expandButton: styled.span<{ $open: boolean }>`
    transition: transform 0.3s ease-in-out;
    transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
  `,
};
