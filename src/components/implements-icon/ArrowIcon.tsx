'use client';

import { styles } from './icon.styles';

import { useDrawToolsStore } from '@/features/draw-tools';

export function ArrowIcon() {
  const cursor = useDrawToolsStore((state) => state.cursor);
  const setCursor = useDrawToolsStore((state) => state.setCursor);

  const fill = cursor === 'ARROW' ? '#ddd' : '#aaa';

  return (
    <styles.container
      onClick={() => {
        setCursor('ARROW');
      }}
    >
      <Icon fill={fill} />
    </styles.container>
  );
}

function Icon({ fill }: { fill: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
    >
      <styles.pathStyle
        d='M15.15 21.875C14.7667 22.0583 14.3833 22.0793 14 21.938C13.6167 21.796 13.3333 21.5333 13.15 21.15L10.15 14.7L7.825 17.95C7.54167 18.35 7.16667 18.475 6.7 18.325C6.23333 18.175 6 17.8583 6 17.375V4.55C6 4.13333 6.18733 3.83333 6.562 3.65C6.93733 3.46667 7.29167 3.50833 7.625 3.775L17.725 11.725C18.1083 12.0083 18.2207 12.375 18.062 12.825C17.904 13.275 17.5833 13.5 17.1 13.5H12.9L15.875 19.875C16.0583 20.2583 16.0793 20.6417 15.938 21.025C15.796 21.4083 15.5333 21.6917 15.15 21.875Z'
        fill={fill}
      />
    </svg>
  );
}
