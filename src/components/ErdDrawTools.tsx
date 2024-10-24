'use client';

import styled from '@emotion/styled';

import {
  ArrowIcon,
  MemoIcon,
  PointerIcon,
  RelationshipIcons,
  TableIcon,
} from './implements-icon';

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

const styles = {
  container: styled.div`
    position: relative;
    display: flex;
    height: 111px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: #222;
    pointer-events: all;
  `,

  notationChange: styled.div`
    cursor: pointer;
    font-size: 16px;
    color: #ededed;
  `,
};
