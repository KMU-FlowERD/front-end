import { styles } from './icon.styles';

export function IdentifyOneToManyIcon({ fill }: { fill: string }) {
  return (
    <svg width='24' height='24'>
      <styles.pathStyle width='24' height='24' fill={fill} />
    </svg>
  );
}
