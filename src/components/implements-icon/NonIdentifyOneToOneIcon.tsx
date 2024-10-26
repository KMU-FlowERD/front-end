import { styles } from './icon.styles';

export function NonIdentifyOneToOneIcon({ fill }: { fill: string }) {
  return (
    <svg width='24' height='24'>
      <styles.relationPath width='24' height='24' fill={fill} />
    </svg>
  );
}
