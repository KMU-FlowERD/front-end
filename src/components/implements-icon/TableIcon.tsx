'use client';

import type { MutableRefObject } from 'react';
import { useRef } from 'react';

import { styles } from './icon.styles';

import { useDrawToolsStore } from '@/features/draw-tools';

export function TableIcon() {
  const iconRef = useRef<SVGSVGElement | null>(null);

  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);

  const fill = entity === 'TABLE' ? '#ddd' : '#aaa';

  // useOutsideClick(
  //   [iconRef],
  //   () => {
  //     setEntity('NONE');
  //   },
  //   true,
  // );

  return (
    <styles.container
      onClick={() => {
        setEntity('TABLE');
      }}
    >
      <Icon fill={fill} iconRef={iconRef} />
    </styles.container>
  );
}

function Icon({
  fill,
  iconRef,
}: {
  fill: string;
  iconRef: MutableRefObject<SVGSVGElement | null>;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 475 475'
      fill='none'
      ref={iconRef}
    >
      <g>
        <styles.pathStyle
          d='M461.667,49.963c-8.949-8.947-19.698-13.418-32.265-13.418H45.682c-12.562,0-23.317,4.471-32.264,13.418
        C4.473,58.912,0,69.663,0,82.228V392.86c0,12.566,4.473,23.309,13.418,32.261c8.947,8.949,19.701,13.415,32.264,13.415h383.72
        c12.566,0,23.315-4.466,32.265-13.415c8.945-8.952,13.415-19.701,13.415-32.261V82.228
        C475.082,69.663,470.612,58.909,461.667,49.963z M146.183,392.85c0,2.673-0.859,4.856-2.574,6.571
        c-1.712,1.711-3.899,2.562-6.567,2.562h-91.36c-2.662,0-4.853-0.852-6.567-2.562c-1.713-1.715-2.568-3.898-2.568-6.571V338.03
        c0-2.669,0.855-4.853,2.568-6.56c1.714-1.719,3.905-2.574,6.567-2.574h91.363c2.667,0,4.858,0.855,6.567,2.574
        c1.711,1.707,2.57,3.891,2.57,6.56V392.85z M146.183,283.221c0,2.663-0.859,4.854-2.574,6.564
        c-1.712,1.714-3.899,2.569-6.567,2.569h-91.36c-2.662,0-4.853-0.855-6.567-2.569c-1.713-1.711-2.568-3.901-2.568-6.564v-54.819
        c0-2.664,0.855-4.854,2.568-6.567c1.714-1.709,3.905-2.565,6.567-2.565h91.363c2.667,0,4.854,0.855,6.567,2.565
        c1.711,1.713,2.57,3.903,2.57,6.567V283.221z M146.183,173.587c0,2.666-0.859,4.853-2.574,6.567
        c-1.712,1.709-3.899,2.568-6.567,2.568h-91.36c-2.662,0-4.853-0.859-6.567-2.568c-1.713-1.715-2.568-3.901-2.568-6.567V118.77
        c0-2.666,0.855-4.856,2.568-6.567c1.714-1.713,3.905-2.568,6.567-2.568h91.363c2.667,0,4.854,0.855,6.567,2.568
        c1.711,1.711,2.57,3.901,2.57,6.567V173.587z M292.362,392.85c0,2.673-0.855,4.856-2.563,6.571c-1.711,1.711-3.9,2.562-6.57,2.562
        H191.86c-2.663,0-4.853-0.852-6.567-2.562c-1.713-1.715-2.568-3.898-2.568-6.571V338.03c0-2.669,0.855-4.853,2.568-6.56
        c1.714-1.719,3.904-2.574,6.567-2.574h91.365c2.669,0,4.859,0.855,6.57,2.574c1.704,1.707,2.56,3.891,2.56,6.56v54.819H292.362z
        M292.362,283.221c0,2.663-0.855,4.854-2.563,6.564c-1.711,1.714-3.9,2.569-6.57,2.569H191.86c-2.663,0-4.853-0.855-6.567-2.569
        c-1.713-1.711-2.568-3.901-2.568-6.564v-54.819c0-2.664,0.855-4.854,2.568-6.567c1.714-1.709,3.904-2.565,6.567-2.565h91.365
        c2.669,0,4.859,0.855,6.57,2.565c1.704,1.713,2.56,3.903,2.56,6.567v54.819H292.362z M292.362,173.587
        c0,2.666-0.855,4.853-2.563,6.567c-1.711,1.709-3.9,2.568-6.57,2.568H191.86c-2.663,0-4.853-0.859-6.567-2.568
        c-1.713-1.715-2.568-3.901-2.568-6.567V118.77c0-2.666,0.855-4.856,2.568-6.567c1.714-1.713,3.904-2.568,6.567-2.568h91.365
        c2.669,0,4.859,0.855,6.57,2.568c1.704,1.711,2.56,3.901,2.56,6.567v54.817H292.362z M438.536,392.85
        c0,2.673-0.855,4.856-2.562,6.571c-1.718,1.711-3.908,2.562-6.571,2.562h-91.354c-2.673,0-4.862-0.852-6.57-2.562
        c-1.711-1.715-2.56-3.898-2.56-6.571V338.03c0-2.669,0.849-4.853,2.56-6.56c1.708-1.719,3.897-2.574,6.57-2.574h91.354
        c2.663,0,4.854,0.855,6.571,2.574c1.707,1.707,2.562,3.891,2.562,6.56V392.85z M438.536,283.221c0,2.663-0.855,4.854-2.562,6.564
        c-1.718,1.714-3.908,2.569-6.571,2.569h-91.354c-2.673,0-4.862-0.855-6.57-2.569c-1.711-1.711-2.56-3.901-2.56-6.564v-54.819
        c0-2.664,0.849-4.854,2.56-6.567c1.708-1.709,3.897-2.565,6.57-2.565h91.354c2.663,0,4.854,0.855,6.571,2.565
        c1.707,1.713,2.562,3.903,2.562,6.567V283.221z M438.536,173.587c0,2.666-0.855,4.853-2.562,6.567
        c-1.718,1.709-3.908,2.568-6.571,2.568h-91.354c-2.673,0-4.862-0.859-6.57-2.568c-1.711-1.715-2.56-3.901-2.56-6.567V118.77
        c0-2.666,0.849-4.856,2.56-6.567c1.708-1.713,3.897-2.568,6.57-2.568h91.354c2.663,0,4.854,0.855,6.571,2.568
        c1.707,1.711,2.562,3.901,2.562,6.567V173.587z'
          fill={fill}
        />
      </g>
    </svg>
  );
}
