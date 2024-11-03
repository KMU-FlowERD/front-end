'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import {
  ErdDrawTools,
  RelationshipInformation,
  TableInformation,
} from '@/components';
import { Table } from '@/components/table';
import { useDrawToolsStore } from '@/features/draw-tools';
import type { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

export function ErdProjectPage() {
  const tables = useERDProjectStore((state) => state.tables);

  const createTable = useERDProjectStore((state) => state.createTable);
  const updateTable = useERDProjectStore((state) => state.updateTable);

  const createRelation = useERDProjectStore((state) => state.createRelation);

  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);

  const [lastTable, setLastTable] = useState<ERDTable | undefined>(undefined);

  const onPositionChange = (id: string, pos: { left: number; top: number }) => {
    const table = tables.find((t) => t.id === id);

    if (table) {
      const updatedTable = { ...table, left: pos.left, top: pos.top };
      updateTable(updatedTable);
    }
  };

  const displayClicked = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (entity === 'TABLE') {
      const { pageX, pageY } = event;
      const tableCount = tables.length;

      createTable({
        id: tableCount.toString(),
        title: 'table',
        top: pageY,
        left: pageX,
        width: 50,
        height: 30,
        columns: [],
      });

      setEntity('NONE');
    }
  };

  const TableClick = (table: ERDTable) => {
    if (mapping !== undefined && mapping.type !== 'MANY-TO-MANY') {
      if (lastTable) {
        createRelation({
          id: Math.random().toString(36).slice(2),
          from: lastTable.id,
          to: table.id,
          cardinality: mapping.type,
          identify: lastTable.id === table.id ? false : mapping.identify,
          participation: { from: 'MANDATORY', to: 'FULL' },
        });
        setLastTable(undefined);
        setMapping(undefined);
      } else {
        setLastTable(table);
      }
    }
  };

  return (
    <styles.displayWrapper onClick={displayClicked}>
      <styles.container>
        <TableInformation />
        <ErdDrawTools />
        <RelationshipInformation />
        {tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            onClick={TableClick}
            onPositionChange={onPositionChange}
          />
        ))}
      </styles.container>
    </styles.displayWrapper>
  );
}

const styles = {
  displayWrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,

  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 16px;
    align-items: flex-end;
    gap: 16px;
    background: #2f2f2f;
  `,
};
