'use client';

import type { RefObject } from 'react';

import { styles } from './RelationshipInformation.styles';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';

export function RelationshipInformation({
  relationshipRef,
}: {
  relationshipRef: RefObject<HTMLDivElement>;
}) {
  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  useInsideClick(
    [relationshipRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  return <styles.container ref={relationshipRef} />;
}
