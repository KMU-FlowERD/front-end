import { getStartEndDirection } from './mapping.helper';
import { Direction, TableDirectionChild } from './mapping.type';

import { ERDRelation, ERDTable } from '@/features/erd-project';

export const useRelationshipData = (
  tables: ERDTable[],
  relations: Record<ERDTable['id'], ERDRelation[]>,
) => {
  const relationDuplicate: ERDRelation[] = [];
  const tableDirection: Map<ERDTable['id'], TableDirectionChild> = new Map();
  const selfReferenceMapping: Map<ERDTable['id'], number> = new Map();

  tables.forEach((table) => {
    relations[table.id]?.forEach((relation) => {
      if (!relationDuplicate.includes(relation))
        relationDuplicate.push(relation);
    });
  });

  tables.forEach((table) => {
    tableDirection.set(
      table.id,
      new Map([
        ['LEFT', []],
        ['RIGHT', []],
        ['TOP', []],
        ['BOTTOM', []],
      ]),
    );

    selfReferenceMapping.set(table.id, 0);
  });

  relationDuplicate.forEach((relation) => {
    const fromTable = tables.find((t) => t.id === relation.from);
    const toTable = tables.find((t) => t.id === relation.to);

    if (fromTable && toTable && fromTable.id !== toTable.id) {
      const { fromDirection, toDirection } = getStartEndDirection(
        fromTable,
        toTable,
      );

      tableDirection
        .get(fromTable.id)
        ?.get(fromDirection)
        ?.push({
          sortVal:
            fromDirection === 'LEFT' || fromDirection === 'RIGHT'
              ? toTable.top
              : toTable.left,
          tableID: toTable.id,
          relationID: relation.id,
        });

      tableDirection
        .get(toTable.id)
        ?.get(toDirection)
        ?.push({
          sortVal:
            toDirection === 'LEFT' || toDirection === 'RIGHT'
              ? fromTable.top
              : fromTable.left,
          tableID: fromTable.id,
          relationID: relation.id,
        });
    }
  });

  const directions: Direction[] = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];

  directions.forEach((direction) => {
    tableDirection.keys().forEach((tableID) =>
      tableDirection
        .get(tableID)
        ?.get(direction)
        ?.sort((a, b) => a.sortVal - b.sortVal),
    );
  });

  return { relationDuplicate, tableDirection, selfReferenceMapping };
};
