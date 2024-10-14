import styled from '@emotion/styled';

export function IdentifyOneToOneIcon({ fill }: { fill: string }) {
  return (
    <svg width='24' height='24'>
      <styles.pathStyle width='24' height='24' fill={fill} />
    </svg>
  );
}

const styles = {
  pathStyle: styled.rect`
    &:hover {
      fill: #ddd;
    }
  `,
};
