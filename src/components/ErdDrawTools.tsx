'use client';

import styled from '@emotion/styled';

import {
  ArrowIcon,
  MemoIcon,
  PointerIcon,
  RelationshipIcons,
  TableIcon,
} from './implements-icon';

export function ErdDrawTools() {
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
      <RelationshipIcons type={{ type: 'one-to-one', identify: true }} />
      <RelationshipIcons type={{ type: 'one-to-many', identify: true }} />
      <RelationshipIcons type={{ type: 'many-to-many', identify: true }} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons type={{ type: 'one-to-one', identify: false }} />
      <RelationshipIcons type={{ type: 'one-to-many', identify: false }} />
      <RelationshipIcons type={{ type: 'many-to-many', identify: false }} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
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
    z-index: 1;
  `,
};
