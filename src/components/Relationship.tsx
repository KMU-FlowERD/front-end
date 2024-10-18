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

  const tableDir: Map<ERDTable['id'], TableDirectionChild> = new Map();

  const mineMapping: Map<ERDTable['id'], number> = new Map();

  tables.forEach((table) => {
    relations[table.id]?.forEach((relation) => {
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

    if (fromTable && toTable && fromTable.id !== toTable.id) {
      const { fromDirection, toDirection } = getStartEndDirection(
        fromTable,
        toTable,
      );

      if (fromDirection === 'left' || fromDirection === 'right') {
        tableDir.get(fromTable.id)?.get(fromDirection)?.push({
          sortVal: toTable.top,
          tableID: toTable.id,
          relationID: relation.id,
        });
      } else {
        tableDir.get(fromTable.id)?.get(fromDirection)?.push({
          sortVal: toTable.left,
          tableID: toTable.id,
          relationID: relation.id,
        });
      }

      if (toDirection === 'left' || toDirection === 'right') {
        tableDir.get(toTable.id)?.get(toDirection)?.push({
          sortVal: fromTable.top,
          tableID: fromTable.id,
          relationID: relation.id,
        });
      } else {
        tableDir.get(toTable.id)?.get(toDirection)?.push({
          sortVal: fromTable.left,
          tableID: fromTable.id,
          relationID: relation.id,
        });
      }
    }
  });

  tableDir.keys().forEach((tableID) => {
    tableDir
      .get(tableID)
      ?.get('top')
      ?.sort((a, b) => a.sortVal - b.sortVal);
    tableDir
      .get(tableID)
      ?.get('bottom')
      ?.sort((a, b) => a.sortVal - b.sortVal);
    tableDir
      .get(tableID)
      ?.get('left')
      ?.sort((a, b) => a.sortVal - b.sortVal);
    tableDir
      .get(tableID)
      ?.get('right')
      ?.sort((a, b) => a.sortVal - b.sortVal);
  });

  return (
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
