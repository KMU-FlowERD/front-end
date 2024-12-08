import { styles } from './icon.styles';

export function MenuIcon({ onClick }: { onClick: () => void }) {
  return (
    <styles.menuIcon onClick={onClick}>
      <svg width='18' height='18' viewBox='0 0 24 24'>
        <path d={ellipsisIconPath} fill='#ededed' />
      </svg>
    </styles.menuIcon>
  );
}

// Google Material Icons의 more_vert 아이콘 path
const ellipsisIconPath =
  'M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z';
