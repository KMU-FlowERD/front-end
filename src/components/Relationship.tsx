'use client';

import styled from '@emotion/styled';

import { ConnectLine } from './ConnectLine';
import { RelationshipMenu } from './RelationshipMenu';

import { ERDRelation, ERDTable } from '@/features/erd-project';
import { useContextMenu, useRelationshipData } from '@/features/mapping';

interface RelationshipProps {
  tables: ERDTable[];
  relations: Record<ERDTable['id'], ERDRelation[]>;
  deleteRelation: (relation: ERDRelation) => void;
  updateRelation: (relation: ERDRelation) => void;
}

export function Relationship({
  tables,
  relations,
  deleteRelation,
  updateRelation,
}: RelationshipProps) {
  const { relationDuplicate, tableDirection, selfReferenceMapping } =
    useRelationshipData(tables, relations);
  const {
    contextMenu,
    lastRelation,
    menuRef,
    openContextMenu,
    closeContextMenu,
  } = useContextMenu();

  return (
    <styles.display>
      {contextMenu && (
        <RelationshipMenu
          position={contextMenu}
          menuRef={menuRef}
          relation={lastRelation}
          onClose={closeContextMenu}
          updateRelation={updateRelation}
          deleteRelation={deleteRelation}
        />
      )}
      <styles.wrapper
        width='100%'
        height='100%'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        {relationDuplicate.map((relation) => (
          <ConnectLine
            key={Math.random().toString(36).slice(2)}
            tables={tables}
            relation={relation}
            tableDirection={tableDirection}
            selfReferenceMapping={selfReferenceMapping}
            handleContextMenu={(e) => openContextMenu(e, relation)}
          />
        ))}
      </styles.wrapper>
    </styles.display>
  );
}

const styles = {
  display: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
  `,
  wrapper: styled.svg`
    width: 100%;
    height: 100%;
  `,
};
