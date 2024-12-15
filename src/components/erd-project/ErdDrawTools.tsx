'use client';

import { useRef } from 'react';
import { generate } from 'rxjs';

import { styles } from './ErdDrawTools.styles';
import { ArrowIcon, MemoIcon, PointerIcon, RelationshipIcons, TableIcon } from '../implements-icon';
import { NotationModal } from '../notation-modal/NotationModal';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useRelationChange } from '@/features/erd-page';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';
import { useModal } from '@/features/modal';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

type NotationType = 'IE' | 'IDEF1X';

export function ErdDrawTools() {
  const { schema } = useDiagramContext();
  const generateDDL = useERDProjectStore((state) => state.generateDDL);

  const boxRef = useRef<HTMLDivElement | null>(null);

  const notation = useDrawToolsStore((state) => state.notation);
  const setMapping = useDrawToolsStore((state) => state.setMapping);
  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setNotation = useDrawToolsStore((state) => state.setNotation);

  const changeRelations = useRelationChange();

  useInsideClick(
    [boxRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  const { Modal, openModal } = useModal(<NotationModal relations={changeRelations} />);

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
    <styles.container ref={boxRef}>
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
      <styles.notationChange onClick={notationChange}>{notation} ↕️</styles.notationChange>
      <button
        onClick={() => {
          if (schema) {
            navigator.clipboard.writeText(generateDDL(schema.name));
            alert('클립보드로 복사되었습니다');
          }
        }}
      >
        DDL
      </button>
      {Modal}
    </styles.container>
  );
}

function Relationship({ notation }: { notation: NotationType }) {
  if (notation === 'IDEF1X') {
    return (
      <>
        <RelationshipIcons type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: true }} />
        {/* <div style={{ width: '1px', height: '40px', background: '#444' }} />
        <RelationshipIcons
          type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: false }}
        /> */}
      </>
    );
  }

  return (
    <>
      <RelationshipIcons type={{ cardinality: { from: 'ONE', to: 'ONE' }, identify: true }} />
      <RelationshipIcons type={{ cardinality: { from: 'ONE', to: 'MANY' }, identify: true }} />
      <RelationshipIcons type={{ cardinality: { from: 'MANY', to: 'MANY' }, identify: true }} />

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
