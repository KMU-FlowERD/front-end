'use client';

import { styles } from './erd-project.page.styles';

import {
  ErdDrawTools,
  RelationshipInformation,
  TableInformation,
} from '@/components/project-page';
import { Relationship } from '@/components/project-page/Relationship';
import { Table } from '@/components/table';
import { useDrawToolsStore } from '@/features/draw-tools';
import { useCanvasSize, usePageMove, useLastTable } from '@/features/erd-page';
import { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

export function ErdProjectPage() {
  const { projectWidth, projectHeight } = useCanvasSize();
  const { lastTable, setLastTable } = useLastTable();
  usePageMove();

  const tables = useERDProjectStore((state) => state.tables);
  const createTable = useERDProjectStore((state) => state.createTable);
  const updateTable = useERDProjectStore((state) => state.updateTable);
  const createRelation = useERDProjectStore((state) => state.createRelation);

  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);
  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const cursor = useDrawToolsStore((state) => state.cursor);

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
    }
  };

  const onPositionChange = (id: string, pos: { left: number; top: number }) => {
    const table = tables.find((t) => t.id === id);
    if (cursor === 'ARROW' && table) {
      const updatedTable = { ...table, left: pos.left, top: pos.top };
      updateTable(updatedTable);
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
