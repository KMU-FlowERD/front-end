'use client';

import styled from '@emotion/styled';
import { useStore } from 'zustand';

import { TableMenu, ErdDrawTools, RelationshipMenu, Table } from '@/components';
import { useDrawToolsStore } from '@/features/draw-tools';
import { createERDProjectStore, ERDTable } from '@/features/erd-project';

const store = createERDProjectStore();

export function ErdProjectPage() {
  const tables = useStore(store, (state) => state.tables);
  const createTable = useStore(store, (state) => state.createTable);
  const updateTable = useStore(store, (state) => state.updateTable);
  const createColumn = useStore(store, (state) => state.createColumn);

  const entity = useDrawToolsStore((state) => state.entity);
  const setEntity = useDrawToolsStore((state) => state.setEntity);

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
    if (entity === 'table') {
      setEntity('none');

      const { pageX, pageY } = event;
      const tableCount = tables.length;

      // 테이블 생성
      createTable({
        id: tableCount.toString(),
        title: 'table',
        top: pageY,
        left: pageX,
        width: 100,
        height: 50,
        columns: [],
      });
    }
  };

  return (
    <styles.container onClick={displayClicked}>
      <TableMenu />
      <ErdDrawTools />
      <RelationshipMenu />
      {getTable(tables, onPositionChange, createColumn)}
    </styles.container>
  );
}

function getTable(
  tables: ERDTable[],
  // childTables: Set<string>,
  // crowFoot: boolean,
  // onClick: (table: ERDTable) => void,
  onPositionChange: (id: string, pos: { left: number; top: number }) => void,
  createColumn: (table: ERDTable, isPK: boolean) => void,
) {
  return tables.map((table) => (
    <Table
      key={table.id}
      table={table}
      // onClick={onClick}
      onPositionChange={onPositionChange}
      createColumn={createColumn}
      // rounded={childTables.has(table.id) && !crowFoot}
    />
  ));
}

const styles = {
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
