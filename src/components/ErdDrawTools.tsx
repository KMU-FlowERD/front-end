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
      <PointerIcon fill='#aaa' />
      <ArrowIcon fill='#aaa' />
      <div
        style={{
          width: '1px',
          height: '40px',
          background: '#444',
          marginRight: '7px',
        }}
      />
      <TableIcon fill='#aaa' />
      <MemoIcon fill='#aaa' />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons type='IOBO' fill='#aaa' />
      <RelationshipIcons type='IOBM' fill='#aaa' />
      <RelationshipIcons type='IMBM' fill='#aaa' />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons type='NIOBO' fill='#aaa' />
      <RelationshipIcons type='NIOBM' fill='#aaa' />
      <RelationshipIcons type='NIMBM' fill='#aaa' />
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
  `,
};
