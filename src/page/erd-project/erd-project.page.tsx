'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { styles } from './erd-project.page.styles';

import {
  ErdDrawTools,
  RelationshipInformation,
  TableInformation,
} from '@/components';
import { Relationship } from '@/components/erd-project/Relationship';
import { Table } from '@/components/table';
import { useDrawToolsStore } from '@/features/draw-tools';
import { useCanvasSize, usePageMove } from '@/features/erd-page';
import type { ERDTable, WithPosition } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import {
  DiagramChooseProvider,
  useDiagramContext,
} from '@/providers/DiagramChooseProvider';

export function ERDProjectPage() {
  return (
    <DiagramChooseProvider>
      <ErdProjectPageProvider />
    </DiagramChooseProvider>
  );
}

function ErdProjectPageProvider() {
  const [lastTable, setLastTable] = useState<
    WithPosition<ERDTable> | undefined
  >(undefined);

  const { projectWidth, projectHeight } = useCanvasSize();
  usePageMove();

  const resizeCanvas = useERDProjectStore((state) => state.resizeCanvas);

  const { schema, diagram } = useDiagramContext();

  const tables = diagram?.tables;

  const createTable = useERDProjectStore((state) => state.createTable);
  const updateTable = useERDProjectStore((state) => state.updateTable);
  const createRelation = useERDProjectStore((state) => state.createRelation);

  const insertTableIntoDiagram = useERDProjectStore(
    (state) => state.insertTableIntoDiagram,
  );

  const mapping = useDrawToolsStore((state) => state.mapping);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const entity = useDrawToolsStore((state) => state.entity);

  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const cursor = useDrawToolsStore((state) => state.cursor);

  const notation = useDrawToolsStore((state) => state.notation);

  const projectMaxDistance = 300;

  const childTables = new Set<string>();

  if (projectWidth === undefined || projectHeight === undefined)
    return (
      <styles.displayWrapper>
        <Relationship />
        {tables?.map((table) => (
          <Table
            key={table.id}
            table={table}
            highlight={lastTable?.id === table.id}
            child={childTables.has(table.id)}
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

  tables?.forEach((table) => {
    table.relations.forEach((relation) => {
      childTables.add(relation.to);
    });
  });

  const displayClicked = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (
      schema === undefined ||
      diagram === undefined ||
      projectWidth === undefined ||
      projectHeight === undefined
    )
      return;

    const { pageX, pageY } = event;
    if (cursor === 'ARROW' && entity === 'TABLE') {
      const table = {
        id: Math.random().toString(36).slice(2),
        title: `table${schema.tables.length + 1}`,
        width: 50,
        height: 30,
        columns: [],
        relations: [],
      };

      createTable(schema.name, table);
      insertTableIntoDiagram(schema.name, diagram.name, {
        ...table,
        top: pageY,
        left: pageX,
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
        resizeCanvas(schema.name, diagram.name, {
          width: updateProjectWidth,
          height: updateProjectHeight,
        });
      }
    }
  };

  const onPositionChange = (id: string, pos: { left: number; top: number }) => {
    if (
      schema === undefined ||
      diagram === undefined ||
      tables === undefined ||
      projectHeight === undefined ||
      projectWidth === undefined
    )
      return;

    const table = tables.find((t) => t.id === id);
    if (cursor === 'ARROW' && table) {
      const updatedTable = { ...table, left: pos.left, top: pos.top };
      updateTable(schema.name, updatedTable);

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
        resizeCanvas(schema.name, diagram.name, {
          width: updateProjectWidth,
          height: updateProjectHeight,
        });
      }
    }
  };

  const TableClick = (table: WithPosition<ERDTable>) => {
    if (schema === undefined || diagram === undefined) return;

    if (cursor !== 'ARROW' || mapping === undefined) return;

    if (!lastTable) {
      setLastTable(table);
      return;
    }

    setLastTable(undefined);
    setMapping(undefined);

    // const duplicationLength = table.relations.filter((relation) =>
    //   relation.constraintName.includes(`FK_${table.title}_${lastTable.title}`),
    // ).length;

    const constraintName = `FK_${table.title}_${lastTable.title}_${uuidv4()}`;

    if (notation === 'IDEF1X') {
      createRelation(schema.name, {
        id: Math.random().toString(36).slice(2),
        from: lastTable.id,
        to: table.id,
        identify: lastTable.id === table.id ? false : mapping.identify,
        participation: { to: 'FULL' },
        constraintName,
      });

      return;
    }

    if (mapping.cardinality.from !== 'MANY') {
      createRelation(schema.name, {
        id: Math.random().toString(36).slice(2),
        from: lastTable.id,
        to: table.id,
        cardinality: mapping.cardinality,
        identify: lastTable.id === table.id ? false : mapping.identify,
        participation: { from: 'FULL', to: 'FULL' },
        constraintName,
      });

      return;
    }

    const mappingTable: ERDTable = {
      id: Math.random().toString(36).slice(2),
      title: `${lastTable.title}_${table.title}`,
      width: 50,
      height: 30,
      columns: [],
      relations: [],
    };

    createTable(schema.name, mappingTable);

    insertTableIntoDiagram(schema.name, diagram?.name, {
      ...mappingTable,
      top: (lastTable.top + table.top) / 2,
      left: (lastTable.left + table.left) / 2,
    });

    const firstConstraint = `FK_${mappingTable.title}_${lastTable.title}_${uuidv4()}`;
    const lastConstraint = `FK_${mappingTable.title}_${table.title}_${uuidv4()}`;

    createRelation(schema.name, {
      id: Math.random().toString(36).slice(2),
      from: lastTable.id,
      to: mappingTable.id,
      cardinality: { from: 'ONE', to: 'MANY' },
      identify: lastTable.id === table.id ? false : mapping.identify,
      participation: { from: 'FULL', to: 'FULL' },
      constraintName: firstConstraint,
    });

    createRelation(schema.name, {
      id: Math.random().toString(36).slice(2),
      from: table.id,
      to: mappingTable.id,
      cardinality: { from: 'ONE', to: 'MANY' },
      identify: lastTable.id === table.id ? false : mapping.identify,
      participation: { from: 'FULL', to: 'FULL' },
      constraintName: lastConstraint,
    });
  };

  return (
    <styles.displayWrapper
      onClick={displayClicked}
      $pos={{ width: projectWidth, height: projectHeight }}
    >
      <Relationship />
      {tables?.map((table) => (
        <Table
          key={table.id}
          table={table}
          highlight={lastTable?.id === table.id}
          child={childTables.has(table.id)}
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
