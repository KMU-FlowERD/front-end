import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type {
  ERDColumn,
  ERDDiagram,
  ERDProject,
  ERDRelation,
  ERDSchema,
  ERDTable,
  WithPosition,
} from './erd-project.type';

export type ERDProjectState = ERDProject;

export interface ERDProjectAction {
  setProject: (project: ERDProject) => void;

  updateProjectInfo: (metaData: {
    title: string;
    description?: string;
  }) => void;

  createSchema: (schema: ERDSchema) => void;

  updateSchema: (schema: ERDSchema) => void;

  deleteSchema: (schemaName: ERDSchema['name']) => void;

  createDiagram: (schemaName: ERDSchema['name'], diagram: ERDDiagram) => void;

  updateDiagram: (schemaName: ERDSchema['name'], diagram: ERDDiagram) => void;

  deleteDiagram: (
    schemaName: ERDSchema['name'],
    diagramName: ERDDiagram['name'],
  ) => void;

  insertTableIntoDiagram: (
    schemaName: ERDSchema['name'],
    diagramName: ERDDiagram['name'],
    table: WithPosition<ERDTable>,
  ) => void;

  removeTableFromDiagram: (
    schemaName: ERDSchema['name'],
    diagramName: ERDDiagram['name'],
    table: WithPosition<ERDTable>,
  ) => void;

  moveTableInDiagram: (
    schemaName: ERDSchema['name'],
    diagramName: ERDDiagram['name'],
    table: WithPosition<ERDTable>,
  ) => void;

  resizeCanvas: (
    schemaName: ERDSchema['name'],
    diagramName: ERDDiagram['name'],
    size: { width: number; height: number },
  ) => void;

  createTable: (schemaName: ERDSchema['name'], table: ERDTable) => void;

  updateTable: (schemaName: ERDSchema['name'], table: ERDTable) => void;

  deleteTable: (schemaName: ERDSchema['name'], tableId: ERDTable['id']) => void;

  createColumn: (
    schemaName: ERDSchema['name'],
    table: ERDTable,
    isPK: boolean,
  ) => void;

  updateColumn: (
    schemaName: ERDSchema['name'],
    table: ERDTable,
    column: ERDColumn,
  ) => void;

  deleteColumn: (
    schemaName: ERDSchema['name'],
    table: ERDTable,
    column: ERDColumn,
  ) => void;

  createRelation: (
    schemaName: ERDSchema['name'],
    relation: ERDRelation,
  ) => void;

  updateRelation: (
    schemaName: ERDSchema['name'],
    relation: ERDRelation,
  ) => void;

  deleteRelation: (
    schemaName: ERDSchema['name'],
    relation: ERDRelation,
  ) => void;

  updateTableInDiagram: (schema: ERDSchema) => void;
}

export type ERDProjectStore = ERDProjectState & ERDProjectAction;

const hasCycle = (schema: ERDSchema, relation: ERDRelation) => {
  const visited = new Set<ERDTable['id']>();

  const dfs = (curr: ERDTable): boolean => {
    if (visited.has(curr.id)) return true;
    visited.add(curr.id);

    return curr.relations
      .filter((r) => r.from === curr.id && r.identify)
      .some((r) => {
        const to = schema.tables.find((t) => t.id === r.to);
        return to ? dfs(to) : false;
      });
  };

  const from = schema.tables.find((t) => t.id === relation.from);
  return from ? dfs(from) : false;
};

export const defaultInitState: ERDProjectState = {
  id: 'default',
  name: '프로젝트 이름',
  description: undefined,
  schemas: [],
};

export const createERDProjectStore = (
  initState: ERDProject = defaultInitState,
) =>
  createStore<ERDProjectStore>()(
    immer((set, get) => ({
      ...initState,

      setProject: (project) =>
        set((state) => {
          state.id = project.id;
          state.name = project.name;
          state.description = project.description;
          state.schemas = project.schemas;
        }),

      updateProjectInfo: ({ title, description }) =>
        set((state) => {
          state.name = title;
          state.description = description;
        }),

      createSchema: (schema) =>
        set((state) => {
          state.schemas.push(schema);
        }),

      updateSchema: (schema) =>
        set((state) => {
          state.schemas = state.schemas.map((s) =>
            s.name === schema.name ? schema : s,
          );
        }),

      deleteSchema: (schemaName) =>
        set((state) => {
          state.schemas = state.schemas.filter((s) => s.name !== schemaName);
        }),

      createDiagram: (schemaName, diagram) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams.push(diagram);
        }),

      updateDiagram: (schemaName, diagram) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema)
            schema.diagrams = schema.diagrams.map((d) =>
              d.name === diagram.name ? diagram : d,
            );
        }),

      deleteDiagram: (schemaName, diagramName) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema)
            schema.diagrams = schema.diagrams.filter(
              (d) => d.name !== diagramName,
            );
        }),

      insertTableIntoDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram) diagram.tables.push(table);
          }
        }),

      removeTableFromDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram)
              diagram.tables = diagram.tables.filter((t) => t.id !== table.id);
          }
        }),

      moveTableInDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram)
              diagram.tables = diagram.tables.map((t) =>
                t.id === table.id ? table : t,
              );
          }
        }),

      resizeCanvas: (schemaName, diagramName, size) => {
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema)
            schema.diagrams = schema.diagrams.map((d) =>
              d.name === diagramName ? { ...d, ...size } : d,
            );
        });
      },

      createTable: (schemaName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.tables.push(table);
        }),

      updateTable: (schemaName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            schema.tables = schema.tables.map((t) =>
              t.id === table.id ? table : t,
            );
            get().updateTableInDiagram(schema);
          }
        }),

      deleteTable: (schemaName, tableId) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === tableId);
          if (!target) return;

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.columns = curr.columns.filter(
              (col) => !target.columns.find((c) => c.id === col.id),
            );

            curr.relations
              .filter((relation) => relation.from === curr.id)
              .forEach((relation) => {
                const toTable = schema.tables.find((t) => t.id === relation.to);
                if (toTable) dfs(toTable);
              });
          };

          target.relations.forEach((relation) => {
            if (relation.to === tableId) {
              const fromTable = schema.tables.find(
                (t) => t.id === relation.from,
              );
              if (fromTable) {
                fromTable.relations = fromTable.relations.filter(
                  (r) => r.id !== relation.id,
                );
              }
            } else {
              const toTable = schema.tables.find((t) => t.id === relation.to);
              if (toTable) {
                dfs(toTable);
                toTable.relations = toTable.relations.filter(
                  (r) => r.id !== relation.id,
                );
              }
            }
          });

          schema.tables = schema.tables.filter((t) => t.id !== tableId);
          get().updateTableInDiagram(schema);
        }),

      createColumn: (schemaName, table, isPK) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === table.id);
          if (!target) return;

          const column: ERDColumn = {
            id: uuidv4(),
            name: 'column',
            nullable: false,
            constraintName: isPK ? `PK_${target.title}` : undefined,
          };

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.relations
              .filter((relation) => relation.from === curr.id)
              .forEach((relation) => {
                const toTable = schema.tables.find((t) => t.id === relation.to);
                if (!toTable) return;

                const { length } = toTable.relations.filter((r) =>
                  r.constraintName.includes(
                    `FK_${toTable.title}_${curr.title}`,
                  ),
                );

                toTable.columns.push({
                  ...column,
                  keyType: relation.identify ? 'PK/FK' : 'FK',
                  nullable: relation.identify
                    ? false
                    : relation.participation.to === 'PARTIAL',
                  constraintName: `FK_${toTable.title}_${curr.title}_${length}`,
                });
                dfs(toTable);
              });
          };

          if (isPK) {
            column.keyType = 'PK';
            dfs(target);
          }

          target.columns.push(column);
          get().updateTableInDiagram(schema);
        }),

      updateColumn: (schemaName, table, column) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === table.id);
          if (!target) return;

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.relations
              .filter((relation) => relation.from === curr.id)
              .forEach((relation) => {
                const toTable = schema.tables.find((t) => t.id === relation.to);
                if (toTable) {
                  toTable.columns = toTable.columns.map((c) =>
                    c.id === column.id
                      ? {
                          ...column,
                          keyType: relation.identify ? 'PK/FK' : 'FK',
                          constraintName: c.constraintName,
                        }
                      : c,
                  );
                  dfs(toTable);
                }
              });
          };

          if (column.keyType === 'PK') {
            dfs(target);
          } else if (column.keyType === 'FK') {
            target.columns = target.columns.map((c) =>
              c.constraintName === column.constraintName
                ? {
                    ...(c.id === column.id ? column : c),
                    nullable: column.nullable,
                  }
                : c,
            );
            const relation = target.relations.find(
              (r) => r.constraintName === column.constraintName,
            );
            if (relation) {
              relation.participation.to = column.nullable ? 'PARTIAL' : 'FULL';
            }
          } else {
            target.columns = target.columns.map((c) =>
              c.id === column.id ? column : c,
            );
          }
          get().updateTableInDiagram(schema);
        }),

      deleteColumn: (schemaName, table, column) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === table.id);
          if (!target) return;

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.relations
              .filter((relation) => relation.from === curr.id)
              .forEach((relation) => {
                const toTable = schema.tables.find((t) => t.id === relation.to);
                if (toTable) {
                  toTable.columns = toTable.columns.filter(
                    (c) => c.id !== column.id,
                  );
                  dfs(toTable);
                }
              });
          };

          if (column.keyType === 'PK') dfs(target);

          target.columns = target.columns.filter((c) => c.id !== column.id);
          get().updateTableInDiagram(schema);
        }),

      createRelation: (schemaName, relation) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const from = schema.tables.find((t) => t.id === relation.from);
          const to = schema.tables.find((t) => t.id === relation.to);
          if (!from || !to) return;

          from.relations.push(relation);
          to.relations.push(relation);

          if (relation.identify && hasCycle(schema, relation)) {
            from.relations = from.relations.filter((r) => r.id !== relation.id);
            to.relations = to.relations.filter((r) => r.id !== relation.id);
            return;
          }

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.relations
              .filter((rel) => rel.from === curr.id)
              .forEach((rel) => {
                const toTable = schema.tables.find((t) => t.id === rel.to);
                if (!toTable) return;
                if (
                  toTable.columns.find(
                    (c) => c.constraintName === rel.constraintName,
                  )
                )
                  return;

                curr.columns
                  .filter(
                    (col) => col.keyType === 'PK' || col.keyType === 'PK/FK',
                  )
                  .forEach((fromCol) => {
                    const { length } = toTable.relations.filter((r) =>
                      r.constraintName.includes(
                        `FK_${toTable.title}_${curr.title}`,
                      ),
                    );

                    toTable.columns.push({
                      ...fromCol,
                      nullable: rel.identify
                        ? false
                        : rel.participation.to === 'PARTIAL',
                      keyType: rel.identify ? 'PK/FK' : 'FK',
                      constraintName: `FK_${toTable.title}_${curr.title}_${length}`,
                    });
                  });

                dfs(toTable);
              });
          };

          const fromTable = schema.tables.find((t) => t.id === relation.from);
          if (fromTable) dfs(fromTable);
          get().updateTableInDiagram(schema);
        }),

      updateRelation: (schemaName, relation) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const from = schema.tables.find((t) => t.id === relation.from);
          const to = schema.tables.find((t) => t.id === relation.to);
          if (!from || !to) return;

          const prevRelation = from.relations.find((r) => r.id === relation.id);
          if (!prevRelation) return;

          from.relations = from.relations.map((r) =>
            r.id === relation.id ? relation : r,
          );
          to.relations = to.relations.map((r) =>
            r.id === relation.id ? relation : r,
          );

          if (relation.identify && hasCycle(schema, relation)) {
            from.relations = from.relations.map((r) =>
              r.id === relation.id ? prevRelation : r,
            );
            to.relations = to.relations.map((r) =>
              r.id === relation.id ? prevRelation : r,
            );
            return;
          }

          to.columns = to.columns.map((col) =>
            col.constraintName === relation.constraintName
              ? {
                  ...col,
                  nullable:
                    relation.participation.to === 'PARTIAL'
                      ? true
                      : relation.identify,
                }
              : col,
          );

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const fromTable = schema.tables.find((t) => t.id === curr.from);
            const toTable = schema.tables.find((t) => t.id === curr.to);

            if (!fromTable || !toTable) return;

            toTable.columns = toTable.columns.map((c) =>
              c.constraintName === curr.constraintName
                ? {
                    ...c,
                    keyType: curr.identify ? 'PK/FK' : 'FK',
                    nullable:
                      curr.participation.to === 'PARTIAL'
                        ? true
                        : curr.identify,
                  }
                : c,
            );

            toTable.relations
              .filter((rel) => rel.from === toTable.id)
              .forEach(dfs);
          };
          dfs(relation);
          get().updateTableInDiagram(schema);
        }),

      deleteRelation: (schemaName, relation) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const from = schema.tables.find((t) => t.id === relation.from);
          const to = schema.tables.find((t) => t.id === relation.to);
          if (!from || !to) return;

          from.relations = from.relations.filter((r) => r.id !== relation.id);
          to.relations = to.relations.filter((r) => r.id !== relation.id);

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const fromTable = schema.tables.find((t) => t.id === curr.from);
            const toTable = schema.tables.find((t) => t.id === curr.to);

            if (!fromTable || !toTable) return;

            toTable.columns = toTable.columns.filter(
              (c) => c.constraintName !== curr.constraintName,
            );

            toTable.relations
              .filter((rel) => rel.from === toTable.id)
              .forEach(dfs);
          };

          dfs(relation);
          get().updateTableInDiagram(schema);
        }),

      updateTableInDiagram: (schema) =>
        set(() => {
          schema.diagrams.forEach((diagram) => {
            diagram.tables = diagram.tables.filter((table) =>
              schema.tables.find((t) => t.id === table.id),
            );
          });

          schema.tables.forEach((table) => {
            schema.diagrams.forEach((diagram) => {
              diagram.tables = diagram.tables.map((t) =>
                t.id === table.id ? { ...t, ...table } : t,
              );
            });
          });
        }),
    })),
  );
