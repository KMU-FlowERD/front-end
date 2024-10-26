import styled from '@emotion/styled';

export const styles = {
  container: styled.div`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  pathStyle: styled.path`
    &:hover {
      fill: #ddd;
    }
  `,

  relationshipPath: styled.rect`
    &:hover {
      fill: #ddd;
    }
  `,

  menuIcon: styled.div`
    cursor: pointer;
  `,
};
