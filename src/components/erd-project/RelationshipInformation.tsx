'use client';

import { useRef } from 'react';

import { styles } from './RelationshipInformation.styles';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';

export function RelationshipInformation() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  useInsideClick(
    [boxRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  return <styles.container ref={boxRef} />;
}
