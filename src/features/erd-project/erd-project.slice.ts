import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type KeyType = 'pk' | 'fk' | 'pk/fk';

export interface ERDColumn {
  id: string;
  type?: string;
  name: string;
  nullable: boolean;
  keyType?: KeyType;
}

export interface ERDTable {
  id: string;
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  columns: ERDColumn[];
}

export interface ERDRelation {
  id: string;
  from: ERDTable['id'];
  to: ERDTable['id'];
  type?: 'ONE-TO-ONE' | 'ONE-TO-MANY';
  identify: boolean;
  multiplicity: {
    from?: 'OPTIONAL' | 'MANDATORY';
    to: 'OPTIONAL' | 'MANDATORY';
  };
}

export interface ERDProject {
  id: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  tables: ERDTable[];
  relations: Record<ERDTable['id'], ERDRelation[]>;
}

export interface ERDProjectAction {
  setProject: (project: ERDProject) => void;
  updateDescriptions: (metaData: {
    title: string;
    description?: string;
  }) => void;
  updateCanvasSize: (size: { width: number; height: number }) => void;
  createTable: (table: ERDTable) => void;
  updateTable: (table: ERDTable) => void;
  deleteTable: (tableId: ERDTable['id']) => void;
  createColumn: (table: ERDTable, isPK: boolean) => void;
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
  deleteColumn: (table: ERDTable, column: ERDColumn) => void;
  createRelation: (relation: ERDRelation) => void;
  updateRelation: (relation: ERDRelation) => void;
  deleteRelation: (relation: ERDRelation) => void;
}

export type ERDProjectStore = ERDProject & ERDProjectAction;

export const defaultInitState: ERDProject = {
  id: 'default',
  title: '프로젝트 이름',
  description: undefined,
  height: 0,
  width: 0,
  tables: [],
  relations: {},
};

export const createERDProjectStore = (
  initState: ERDProject = defaultInitState,
) =>
  createStore<ERDProjectStore>()(
    immer((set) => ({
      ...initState,

      setProject: (project) =>
        set((state) => {
          state.id = project.id;
          state.title = project.title;
          state.description = project.description;
          state.width = project.width;
          state.height = project.height;
          state.tables = project.tables;
          state.relations = project.relations;
        }),

      updateDescriptions: ({ title, description }) =>
        set((state) => {
          state.title = title;
          state.description = description;
        }),

      updateCanvasSize: ({ width, height }) => {
        if (width <= 0 || height <= 0)
          throw new Error('width, height must greater than 0');

        set((state) => {
          state.width = width;
          state.height = height;
        });
      },

      createTable: (table) =>
        set((state) => {
          state.tables.push(table);
        }),

      updateTable: (table) =>
        set((state) => {
          state.tables = state.tables.map((v) =>
            v.id === table.id ? table : v,
          );
        }),

      deleteTable: (tableId) =>
        set((state) => {
          const target = state.tables.find((v) => v.id === tableId);
          if (!target) return;

          const visited: Record<ERDTable['id'], boolean> = {};

          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;

            visited[curr.id] = true;

            state.relations[curr.id]
              ?.filter((relation) => relation.from === curr.id)
              ?.forEach((relation) => {
                const next = state.tables.find((t) => t.id === relation.to);
                if (!next) return;

                next.columns = next.columns.filter(
                  (col) => !curr.columns.some((c) => c.id === col.id),
                );

                dfs(next);
              });
          };

          dfs(target);

          state.tables = state.tables.filter((v) => v.id !== tableId);
        }),

      createColumn: (table, isPK = false) =>
        set(({ tables, relations }) => {
          const target = tables.find((v) => v.id === table.id);
          if (!target) throw new Error('table not found');

          const column: ERDColumn = {
            id: uuidv4(),
            name: 'column',
            nullable: false,
            keyType: isPK ? 'pk' : undefined,
          };

          target.columns.push(column);

          if (!isPK) return;

          const visited: Record<ERDTable['id'], boolean> = {};

          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;

            visited[curr.id] = true;
            relations[curr.id]
              ?.filter((relation) => relation.from === curr.id)
              ?.forEach((relation) => {
                const next = tables.find((t) => t.id === relation.to);
                if (!next) return;

                next.columns.push({
                  ...column,
                  keyType: relation.identify ? 'pk/fk' : 'fk',
                });
                dfs(next);
              });
          };

          dfs(target);
        }),

      updateColumn: (table, column) =>
        set((state) => {
          const targetTable = state.tables.find((t) => t.id === table.id);
          if (!targetTable) return;

          const targetColumn = targetTable.columns.find(
            (c) => c.id === column.id,
          );
          if (!targetColumn) return;

          targetColumn.name = column.name;
          targetColumn.type = column.type;
          targetColumn.keyType = column.keyType;
          targetColumn.nullable = column.nullable;

          const visited: Record<ERDTable['id'], boolean> = {};

          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;

            visited[curr.id] = true;
            state.relations[curr.id]
              ?.filter((rel) => rel.from === curr.id)
              ?.forEach((rel) => {
                const next = state.tables.find((t) => t.id === rel.to);
                if (!next) return;

                const keyType = rel.identify ? 'pk/fk' : 'fk';
                curr.columns
                  .filter((col) => col.id === column.id)
                  .forEach((col) => {
                    const nextCol = next.columns.find((c) => c.id === col.id);
                    if (nextCol) {
                      nextCol.name = column.name;
                      nextCol.type = column.type;
                      nextCol.keyType = keyType;
                    }
                  });

                dfs(next);
              });
          };

          dfs(targetTable);

          if (column.keyType === 'fk') {
            const updateRelationMultiplicity = (rel: ERDRelation) => {
              const toTable = state.tables.find((t) => t.id === rel.to);
              if (!toTable) return;

              const fromTable = state.tables.find((t) => t.id === rel.from);
              if (!fromTable) return;

              const allFKsNullable = toTable.columns
                .filter((col) => col.keyType === 'fk')
                .filter(
                  (col) =>
                    fromTable.columns.find((c) => c.id === col.id) !== null,
                )
                .every((col) => col.nullable);

              if (allFKsNullable) {
                rel.multiplicity = {
                  ...rel.multiplicity,
                  to: 'optional',
                };
              } else {
                rel.multiplicity = {
                  ...rel.multiplicity,
                  to: 'mandatory',
                };
              }
            };

            state.relations[targetTable.id]?.forEach(
              updateRelationMultiplicity,
            );
          }
        }),

      deleteColumn: (table, column) =>
        set((state) => {
          const targetTable = state.tables.find((t) => t.id === table.id);
          if (!targetTable) return;

          const targetColumn = targetTable.columns.find(
            (c) => c.id === column.id,
          );
          if (!targetColumn) return;

          targetTable.columns = targetTable.columns.filter(
            (c) => c.id !== column.id,
          );

          if (column.keyType === 'pk') {
            const visited: Record<ERDTable['id'], boolean> = {};

            const dfs = (curr: ERDTable) => {
              if (visited[curr.id]) return;

              visited[curr.id] = true;
              state.relations[curr.id]
                ?.filter((rel) => rel.from === curr.id)
                ?.forEach((rel) => {
                  const next = state.tables.find((t) => t.id === rel.to);
                  if (!next) return;

                  next.columns = next.columns.filter((c) => c.id !== column.id);
                  dfs(next);
                });
            };

            dfs(targetTable);
          }
        }),

      createRelation: (relation) =>
        set(({ tables, relations }) => {
          const from = tables.find((table) => table.id === relation.from);
          const to = tables.find((table) => table.id === relation.to);

          if (!from || !to) return;

          if (!relations[relation.from]) relations[relation.from] = [];
          if (!relations[relation.to]) relations[relation.to] = [];
          relations[relation.from].push(relation);
          relations[relation.to].push(relation);

          const visited: Record<ERDTable['id'], boolean> = {};

          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;

            visited[curr.id] = true;
            relations[curr.id]
              ?.filter((rel) => rel.from === curr.id)
              ?.forEach((rel) => {
                const next = tables.find((t) => t.id === rel.to);
                if (!next) return;

                const keyType = rel.identify ? 'pk/fk' : 'fk';
                from.columns
                  .filter((col) => col.keyType === 'pk')
                  .forEach((col) => {
                    next.columns.push({
                      ...col,
                      keyType,
                    });
                  });

                dfs(next);
              });
          };

          dfs(from);
        }),

      updateRelation: (relation) =>
        set((state) => {
          const updateRelationInState = (rel: ERDRelation) =>
            rel.id === relation.id ? relation : rel;

          state.relations[relation.from] = state.relations[relation.from].map(
            updateRelationInState,
          );
          state.relations[relation.to] = state.relations[relation.to].map(
            updateRelationInState,
          );

          const visited: Record<ERDRelation['id'], boolean> = {};

          const dfs = (erdRelation: ERDRelation) => {
            if (visited[erdRelation.id]) return;

            visited[erdRelation.id] = true;

            const fromTable = state.tables.find(
              (table) => table.id === erdRelation.from,
            );
            const toTable = state.tables.find(
              (table) => table.id === erdRelation.to,
            );

            if (!fromTable || !toTable) return;

            fromTable.columns
              .filter((col) => col.keyType === 'pk')
              .forEach((col1) => {
                toTable.columns = toTable.columns.map((col2) =>
                  col2.id === col1.id
                    ? {
                        ...col2,
                        keyType: erdRelation.identify ? 'pk/fk' : 'fk',
                      }
                    : col2,
                );
              });

            state.relations[erdRelation.to]
              .filter((rel) => rel.from === erdRelation.to)
              .forEach(dfs);
          };

          dfs(relation);
        }),

      deleteRelation: (relation) =>
        set((state) => {
          const visited: Record<ERDRelation['id'], boolean> = {};

          const dfs = (erdRelation: ERDRelation) => {
            if (visited[erdRelation.id]) return;

            visited[erdRelation.id] = true;

            const fromTable = state.tables.find(
              (table) => table.id === erdRelation.from,
            );
            const toTable = state.tables.find(
              (table) => table.id === erdRelation.to,
            );

            if (!fromTable || !toTable) return;

            fromTable.columns
              .filter((col) => col.keyType === 'pk')
              .forEach((col1) => {
                toTable.columns = toTable.columns.filter(
                  (col2) => col2.id !== col1.id,
                );
              });

            state.relations[erdRelation.to]
              .filter((rel) => rel.from === erdRelation.to)
              .forEach(dfs);
          };

          dfs(relation);

          state.relations[relation.from] = state.relations[
            relation.from
          ].filter((rel) => rel.id !== relation.id);

          state.relations[relation.to] = state.relations[relation.to].filter(
            (rel) => rel.id !== relation.id,
          );
        }),
    })),
  );
