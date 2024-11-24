'use client';

import { styles } from './ErdDrawTools.styles';
import {
  ArrowIcon,
  MemoIcon,
  PointerIcon,
  RelationshipIcons,
  TableIcon,
} from '../implements-icon';
import { NotationModal } from '../notation-modal/NotationModal';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useRelationChange } from '@/features/erd-page';
import { useModal } from '@/features/modal';

type NotationType = 'IE' | 'IDEF1X';

export function ErdDrawTools() {
  const notation = useDrawToolsStore((state) => state.notation);
  const setNotation = useDrawToolsStore((state) => state.setNotation);

  const changeRelations = useRelationChange();

  const { Modal, openModal } = useModal(
    <NotationModal relations={changeRelations} />,
  );

  const notationChange = () => {
    if (notation === 'IE') {
      setNotation('IDEF1X');
      return;
    }

    if (changeRelations.length > 0) {
      openModal();
      return;
    }

    setNotation('IE');
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
      <Relationship notation={notation} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <styles.notationChange onClick={notationChange}>
        {notation} ↕️
      </styles.notationChange>
      {Modal}
    </styles.container>
  );
}

function Relationship({ notation }: { notation: NotationType }) {
  if (notation === 'IDEF1X') {
    return (
      <>
        <RelationshipIcons
          type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: true }}
        />
        {/* <div style={{ width: '1px', height: '40px', background: '#444' }} />
        <RelationshipIcons
          type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: false }}
        /> */}
      </>
    );
  }

  return (
    <>
      <RelationshipIcons
        type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: true }}
      />
      <RelationshipIcons
        type={{ cardinality: { from: 'ONE', to: 'MANY' }, identify: true }}
      />
      <RelationshipIcons
        type={{ cardinality: { from: 'MANY', to: 'MANY' }, identify: true }}
      />
      {/* <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <RelationshipIcons
        type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: false }}
      />
      <RelationshipIcons
        type={{ cardinality: { from: 'ONE', to: 'MANY' }, identify: false }}
      />
      <RelationshipIcons
        type={{ cardinality: { from: 'MANY', to: 'MANY' }, identify: false }} */}
      {/* /> */}
    </>
  );
}
