import { styles } from './icon.styles';

export function NonIdentifyOneToManyIcon({ fill }: { fill: string }) {
  return (
    <svg width='24' height='24'>
      <styles.relationPath width='24' height='24' fill={fill} />
    </svg>
  );
}
