'use client';

import styled from '@emotion/styled';

import { ConnectLine } from './ConnectLine';

import { ERDRelation, ERDTable } from '@/features/erd-project';
import {
  getStartEndDirection,
  TableDirectionChild,
} from '@/features/table-mapping';

export function Relationship({
  tables,
  relations,
}: {
  tables: ERDTable[];
  relations: Record<ERDTable['id'], ERDRelation[]>;
}) {
  const relationDuplicate: ERDRelation[] = [];
  const childTables: Set<string> = new Set<string>();

  const tableDir: Map<ERDTable['id'], TableDirectionChild> = new Map();

  const mineMapping: Map<ERDTable['id'], number> = new Map();

  tables.forEach((table) => {
    relations[table.id]?.forEach((relation) => {
      childTables.add(relation.to);

      if (!relationDuplicate.includes(relation))
        relationDuplicate.push(relation);
    });
  });

  tables.forEach((table) => {
    tableDir.set(
      table.id,
      new Map([
        ['left', []],
        ['right', []],
        ['top', []],
        ['bottom', []],
      ]),
    );

    mineMapping.set(table.id, 0);
  });

  relationDuplicate.forEach((relation) => {
    const fromTable = tables.find((t) => t.id === relation.from);
    const toTable = tables.find((t) => t.id === relation.to);

    if (fromTable && toTable) {
      const { fromDirection, toDirection } = getStartEndDirection(
        fromTable,
        toTable,
      );

      if (fromDirection === 'left' || fromDirection === 'right') {
        tableDir
          .get(fromTable.id)
          ?.get(fromDirection)
          ?.push({ top: toTable.top, tableID: toTable.id });
      } else {
        tableDir
          .get(fromTable.id)
          ?.get(fromDirection)
          ?.push({ top: toTable.left, tableID: toTable.id });
      }

      if (toDirection === 'left' || toDirection === 'right') {
        tableDir
          .get(toTable.id)
          ?.get(toDirection)
          ?.push({ top: fromTable.top, tableID: fromTable.id });
      } else {
        tableDir
          .get(toTable.id)
          ?.get(toDirection)
          ?.push({ top: fromTable.left, tableID: fromTable.id });
      }
    }
  });

Object.keys(tableDir).forEach((tableID) => {
    tableDir
      .get(tableID)
      ?.get('top')
      ?.sort((a, b) => a.top - b.top);
    tableDir
      .get(tableID)
      ?.get('bottom')
      ?.sort((a, b) => a.top - b.top);
    tableDir
      .get(tableID)
      ?.get('left')
      ?.sort((a, b) => a.top - b.top);
    tableDir
      .get(tableID)
      ?.get('right')
      ?.sort((a, b) => a.top - b.top);
  });

  return getRelation(tables, relationDuplicate, tableDir, mineMapping);
}

function getRelation(
  tables: ERDTable[],
  relations: ERDRelation[],
  tableDir: Map<ERDTable['id'], TableDirectionChild>,
  // crowFoot: boolean,
  mineMapping: Map<ERDTable['id'], number>,
) {
  return (
    <styles.wrapper
      width='100%'
      height='100%'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      {relations.map((relation) => (
        <ConnectLine
          key={Math.random().toString(36).slice(2)}
          tables={tables}
          // crowFoot={crowFoot}
          relation={relation}
          tableDir={tableDir}
          mineMapping={mineMapping}
        />
      ))}
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
  `,
};
