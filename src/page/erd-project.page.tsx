'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import {
  ErdDrawTools,
  RelationshipInformation,
  TableInformation,
} from '@/components';
import { Relationship } from '@/components/Relationship';
import { Table } from '@/components/table';
import { useDrawToolsStore } from '@/features/draw-tools';
import { useCanvasSize, usePageMove } from '@/features/erd-page';
import { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

export function ErdProjectPage() {
  const [lastTable, setLastTable] = useState<ERDTable | undefined>(undefined);

  const { projectWidth, projectHeight } = useCanvasSize();
  usePageMove();

  const updateCanvasSize = useERDProjectStore(
    (state) => state.updateCanvasSize,
  );

  const tables = useERDProjectStore((state) => state.tables);
  const createTable = useERDProjectStore((state) => state.createTable);
  const updateTable = useERDProjectStore((state) => state.updateTable);
  const createRelation = useERDProjectStore((state) => state.createRelation);

  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);
  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const cursor = useDrawToolsStore((state) => state.cursor);

  const projectMaxDistance = 300;

  const displayClicked = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { pageX, pageY } = event;
    if (cursor === 'ARROW' && entity === 'TABLE') {
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

      const updateProjectWidth = Math.max(
        projectWidth,
        pageX + projectMaxDistance + 50,
      );
      const updateProjectHeight = Math.max(
        projectHeight,
        pageY + projectMaxDistance + 30,
      );

      if (
        updateProjectWidth > projectWidth ||
        updateProjectHeight > projectHeight
      ) {
        updateCanvasSize({
          width: updateProjectWidth,
          height: updateProjectHeight,
        });
      }
    }
  };

  const onPositionChange = (id: string, pos: { left: number; top: number }) => {
    const table = tables.find((t) => t.id === id);
    if (cursor === 'ARROW' && table) {
      const updatedTable = { ...table, left: pos.left, top: pos.top };
      updateTable(updatedTable);

      const updateProjectWidth = Math.max(
        projectWidth,
        updatedTable.left + updatedTable.width + projectMaxDistance,
      );
      const updateProjectHeight = Math.max(
        projectHeight,
        updatedTable.top + updatedTable.height + projectMaxDistance,
      );

      if (
        updateProjectWidth > projectWidth ||
        updateProjectHeight > projectHeight
      ) {
        updateCanvasSize({
          width: updateProjectWidth,
          height: updateProjectHeight,
        });
      }
    }
  };

  const TableClick = (table: ERDTable) => {
    if (
      cursor === 'ARROW' &&
      mapping !== undefined &&
      mapping.type !== 'MANY-TO-MANY'
    ) {
      if (lastTable) {
        createRelation({
          id: Math.random().toString(36).slice(2),
          from: lastTable.id,
          to: table.id,
          type: mapping.type,
          identify: lastTable.id === table.id ? false : mapping.identify,
          multiplicity: { from: 'MANDATORY', to: 'MANDATORY' },
        });
        setLastTable(undefined);
        setMapping(undefined);
      } else {
        setLastTable(table);
      }
    }
  };

  return (
    <styles.displayWrapper
      onClick={displayClicked}
      $pos={{ width: projectWidth, height: projectHeight }}
    >
      <Relationship />
      {tables.map((table) => (
        <Table
          key={table.id}
          table={table}
          onClick={TableClick}
          onPositionChange={onPositionChange}
        />
      ))}
      <styles.container>
        <TableInformation />
        <ErdDrawTools />
        <RelationshipInformation />
      </styles.container>
    </styles.displayWrapper>
  );
}

const styles = {
  displayWrapper: styled.div<{ $pos: { width: number; height: number } }>`
    position: relative;
    width: ${({ $pos }) => `${$pos.width}px`};
    height: ${({ $pos }) => `${$pos.height}px`};
    background: #2f2f2f;
  `,
  container: styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 16px;
    align-items: flex-end;
    gap: 16px;
    background: transparent;
    pointer-events: none;
    z-index: 2;
  `,
};
