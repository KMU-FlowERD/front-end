import styled from '@emotion/styled';

export const styles = {
  displayWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    color: #ededed;
    width: 100%;
  `,

  mainNode: styled.div<{ $highlight: boolean }>`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #ededed;
    gap: 4px;
    cursor: pointer;
    padding-bottom: 2px;
    border-bottom: ${({ $highlight }) => ($highlight ? '1px solid #eee' : 'none')};
    margin-bottom: 0.25rem;

    span {
      flex: 1;
      text-align: start;
    }
  `,

  childNode: styled.div`
    margin-left: 8px;
    font-size: 14px;
    color: #ededed;
  `,

  expandButton: styled.button<{ $open: boolean }>`
    all: unset;
    transition: transform 0.3s ease-in-out;
    transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
  `,

  deleteButton: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `,
};
