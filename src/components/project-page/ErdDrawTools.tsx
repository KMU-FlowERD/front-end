'use client';

import { styles } from './ErdDrawTools.styles';

import {
  ArrowIcon,
  MemoIcon,
  PointerIcon,
  RelationshipIcons,
  TableIcon,
} from '@/components/implements-icon';
import { useDrawToolsStore } from '@/features/draw-tools';

export function ErdDrawTools() {
  const notation = useDrawToolsStore((state) => state.notation);
  const setNotation = useDrawToolsStore((state) => state.setNotation);

  const notationChange = () => {
    if (notation === 'IE') setNotation('IDEF1X');
    else setNotation('IE');
  };

  return (
    <styles.container>
      <PointerIcon />
      <ArrowIcon />
      <div
        style={{
          width: '1px',
          height: '40px',
          background: '#444',
          marginRight: '7px',
        }}
      />
      <TableIcon />
      <MemoIcon />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons type={{ type: 'ONE-TO-ONE', identify: true }} />
      <RelationshipIcons type={{ type: 'ONE-TO-MANY', identify: true }} />
      <RelationshipIcons type={{ type: 'MANY-TO-MANY', identify: true }} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons type={{ type: 'ONE-TO-ONE', identify: false }} />
      <RelationshipIcons type={{ type: 'ONE-TO-MANY', identify: false }} />
      <RelationshipIcons type={{ type: 'MANY-TO-MANY', identify: false }} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <styles.notationChange onClick={notationChange}>
        {notation} ↕️
      </styles.notationChange>
    </styles.container>
  );
}
