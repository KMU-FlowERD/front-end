import { styles } from './icon.styles';

export function NonIdentifyManyToManyIcon({ fill }: { fill: string }) {
  return (
    <svg width='24' height='24'>
      <styles.relationshipPath width='24' height='24' fill={fill} />
    </svg>
  );
}
