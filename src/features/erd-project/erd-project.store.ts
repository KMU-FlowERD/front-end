import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getProjectAll } from './erd-project.api';
import type {
  ERDColumn,
  ERDDiagram,
  ERDProject,
  ERDRelation,
  ERDSchema,
  ERDTable,
  WithPosition,
} from './erd-project.type';

import { loadFromLocalStorage, saveToLocalStorage } from '@/shared/storage';

export type ERDProjectState = ERDProject;

export interface ERDProjectAction {
  setProject: (project: ERDProject) => void;

  updateProjectInfo: (metaData: { title: string; description?: string }) => void;

  createSchema: (schema: ERDSchema) => void;

  updateSchema: (schema: ERDSchema) => void;

  changeSchemaName: (schema: ERDSchema, name: string) => void;

  deleteSchema: (schemaName: ERDSchema['name']) => void;

  createDiagram: (schemaName: ERDSchema['name'], diagram: ERDDiagram) => void;

  updateDiagram: (schemaName: ERDSchema['name'], diagram: ERDDiagram) => void;

  changeDiagramName: (schemaName: ERDSchema['name'], diagram: ERDDiagram, name: string) => void;

  deleteDiagram: (schemaName: ERDSchema['name'], diagramName: ERDDiagram['name']) => void;

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

  createColumn: (schemaName: ERDSchema['name'], table: ERDTable, isPK: boolean) => void;

  updateColumn: (schemaName: ERDSchema['name'], table: ERDTable, column: ERDColumn) => void;

  deleteColumn: (schemaName: ERDSchema['name'], table: ERDTable, column: ERDColumn) => void;

  createRelation: (schemaName: ERDSchema['name'], relation: ERDRelation) => void;

  updateRelation: (schemaName: ERDSchema['name'], relation: ERDRelation) => void;

  deleteRelation: (schemaName: ERDSchema['name'], relation: ERDRelation) => void;

  updateTableInDiagram: (schema: ERDSchema) => void;

  fetchAndSetProject: (projectId: string) => Promise<void>;

  generateDDL: (schemaName: ERDSchema['name']) => string;
}

export type ERDProjectStore = ERDProjectState & ERDProjectAction;

const hasCycle = (schema: ERDSchema, relation: ERDRelation) => {
  const visited = new Set<ERDTable['id']>();

  const dfs = (curr: ERDTable): boolean => {
    if (visited.has(curr.id)) return true;
    visited.add(curr.id);

    const result = curr.relations
      .filter((r) => r.from === curr.id && r.identify)
      .some((r) => {
        const to = schema.tables.find((t) => t.id === r.to);
        return to ? dfs(to) : false;
      });

    visited.delete(curr.id);

    return result;
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

export const createERDProjectStore = (initState: ERDProject = defaultInitState) =>
  createStore<ERDProjectStore>()(
    immer((set, get) => ({
      ...initState,

      setProject: (project) =>
        set((state) => {
          state.id = project.id;
          state.name = project.name;
          state.description = project.description;
          state.schemas = project.schemas;
          saveToLocalStorage(project.id, state);
        }),

      updateProjectInfo: ({ title, description }) =>
        set((state) => {
          state.name = title;
          state.description = description;
          saveToLocalStorage(state.id, state);
        }),

      createSchema: (schema) =>
        set((state) => {
          state.schemas.push(schema);
          saveToLocalStorage(state.id, state);
        }),

      updateSchema: (schema) =>
        set((state) => {
          state.schemas = state.schemas.map((s) => (s.name === schema.name ? schema : s));
          saveToLocalStorage(state.id, state);
        }),

      changeSchemaName: (schema, name) =>
        set((state) => {
          state.schemas = state.schemas.map((s) => (s.name === schema.name ? { ...s, name } : s));
          saveToLocalStorage(state.id, state);
        }),

      deleteSchema: (schemaName) =>
        set((state) => {
          state.schemas = state.schemas.filter((s) => s.name !== schemaName);
          saveToLocalStorage(state.id, state);
        }),

      createDiagram: (schemaName, diagram) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams.push(diagram);
          saveToLocalStorage(state.id, state);
        }),

      updateDiagram: (schemaName, diagram) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams = schema.diagrams.map((d) => (d.name === diagram.name ? diagram : d));
          saveToLocalStorage(state.id, state);
        }),

      changeDiagramName: (schemaName, diagram, name) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams = schema.diagrams.map((d) => (d.name === diagram.name ? { ...d, name } : d));
          saveToLocalStorage(state.id, state);
        }),

      deleteDiagram: (schemaName, diagramName) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams = schema.diagrams.filter((d) => d.name !== diagramName);
          saveToLocalStorage(state.id, state);
        }),

      insertTableIntoDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram) diagram.tables.push(table);
          }
          saveToLocalStorage(state.id, state);
        }),

      removeTableFromDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram) diagram.tables = diagram.tables.filter((t) => t.id !== table.id);
          }
          saveToLocalStorage(state.id, state);
        }),

      moveTableInDiagram: (schemaName, diagramName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            const diagram = schema.diagrams.find((d) => d.name === diagramName);
            if (diagram) diagram.tables = diagram.tables.map((t) => (t.id === table.id ? table : t));
          }
          saveToLocalStorage(state.id, state);
        }),

      resizeCanvas: (schemaName, diagramName, size) => {
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.diagrams = schema.diagrams.map((d) => (d.name === diagramName ? { ...d, ...size } : d));
          saveToLocalStorage(state.id, state);
        });
      },

      createTable: (schemaName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) schema.tables.push(table);
          saveToLocalStorage(state.id, state);
        }),

      updateTable: (schemaName, table) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (schema) {
            schema.tables = schema.tables.map((t) => (t.id === table.id ? table : t));
            get().updateTableInDiagram(schema);
          }
          saveToLocalStorage(state.id, state);
        }),

      deleteTable: (schemaName, tableId) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === tableId);
          if (!target) return;

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const from = schema.tables.find((t) => t.id === curr.from);
            const to = schema.tables.find((t) => t.id === curr.to);
            if (!from || !to) return;

            to.columns = to.columns.filter(
              (col) => !(target.columns.find((c) => c.id === col.id) && curr.constraintName === col.constraintName),
            );

            to.relations.filter((relation) => relation.from === to.id).forEach(dfs);
          };

          target.relations.forEach((relation) => {
            if (relation.to === tableId) {
              const fromTable = schema.tables.find((t) => t.id === relation.from);
              if (fromTable) {
                fromTable.relations = fromTable.relations.filter((r) => r.id !== relation.id);
              }
            } else {
              // relation.to !== tableId => relation.from === tableId
              dfs(relation);
              const toTable = schema.tables.find((t) => t.id === relation.to);
              if (toTable) toTable.relations = toTable.relations.filter((r) => r.id !== relation.id);
            }
          });

          schema.tables = schema.tables.filter((t) => t.id !== tableId);
          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
        }),

      createColumn: (schemaName, table, isPK) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === table.id);
          if (!target) return;

          const columnName = 'column';
          const existingColumns = target.columns.filter((col) => col.name.startsWith(columnName));
          const column: ERDColumn = {
            id: uuidv4(),
            name: existingColumns.length ? `${columnName}_${existingColumns.length}` : columnName,
            nullable: false,
            constraintName: isPK ? `PK_${target.title}` : undefined,
            path: [],
          };

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation, path: string[]) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const from = schema.tables.find((t) => t.id === curr.from);
            if (!from) return;

            const to = schema.tables.find((t) => t.id === curr.to);
            if (!to) return;

            to.columns.push({
              ...column,
              keyType: curr.identify ? 'PK/FK' : 'FK',
              nullable: curr.identify ? false : curr.participation.to === 'PARTIAL',
              constraintName: curr.constraintName,
              path: [...path, curr.constraintName],
            });

            to.relations.filter((r) => r.from === to.id).forEach((r) => dfs(r, [...path, curr.constraintName]));

            visited[curr.id] = false;
          };

          target.columns.push(column);

          if (isPK) {
            column.keyType = 'PK';
            target.relations.filter((r) => r.from === target.id).forEach((relation) => dfs(relation, []));
          }

          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
        }),

      updateColumn: (schemaName, table, column) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const target = schema.tables.find((t) => t.id === table.id);
          if (!target) return;

          if (target.columns.find((c) => c.id !== column.id && c.name === column.name)) return;

          const visited: Record<ERDTable['id'], boolean> = {};
          const dfs = (curr: ERDTable) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            curr.relations
              .filter((relation) => relation.from === curr.id)
              .forEach((relation) => {
                const toTable = schema.tables.find((t) => t.id === relation.to);
                if (!toTable) return;

                const columnCount: Record<string, number> = {};
                toTable.columns = toTable.columns
                  .map((c) =>
                    c.id === column.id && c.constraintName === relation.constraintName
                      ? {
                          ...c,
                          ...column,
                          nullable: c.nullable,
                          constraintName: c.constraintName,
                          path: c.path,
                          keyType: c.keyType,
                        }
                      : c,
                  )
                  .map((c) => {
                    const count = columnCount[c.name] ?? 0;
                    columnCount[c.name] = count + 1;
                    return {
                      ...c,
                      name: `${c.name}${count ? `_${count}` : ''}`,
                    };
                  });

                dfs(toTable);
              });
          };

          if (column.keyType === 'PK' || column.keyType === 'PK/FK') {
            target.columns = target.columns.map((c) =>
              c.id === column.id && c.constraintName === column.constraintName ? column : c,
            );
            dfs(target);
          } else if (column.keyType === 'FK') {
            target.columns = target.columns.map((c) => ({
              ...(c.id === column.id && c.constraintName === column.constraintName ? column : c),
              nullable: c.constraintName === column.constraintName ? column.nullable : c.nullable,
            }));
            const relation = target.relations.find((r) => r.constraintName === column.constraintName);
            if (relation) {
              relation.participation.to = column.nullable ? 'PARTIAL' : 'FULL';

              const findTable = schema.tables.find((t) => t.id === relation.from);

              if (!findTable) return;

              const rel = findTable.relations.find((r) => r.id === relation.id);
              if (!rel) return;

              rel.participation.to = column.nullable ? 'PARTIAL' : 'FULL';
            }
          } else {
            target.columns = target.columns.map((c) =>
              c.id === column.id && c.constraintName === column.constraintName ? column : c,
            );
          }

          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
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
                  toTable.columns = toTable.columns.filter((c) => c.id !== column.id);
                  dfs(toTable);
                }
              });
          };

          if (column.keyType === 'PK') dfs(target);

          target.columns = target.columns.filter((c) => c.id !== column.id);
          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
        }),

      createRelation: (schemaName, relation) =>
        set((state) => {
          const schema = state.schemas.find((s) => s.name === schemaName);
          if (!schema) return;

          const from = schema.tables.find((t) => t.id === relation.from);
          const to = schema.tables.find((t) => t.id === relation.to);
          if (!from || !to) return;

          from.relations.push(relation);
          if (from.id !== to.id) to.relations.push(relation);

          if (relation.identify && hasCycle(schema, relation)) {
            from.relations = from.relations.filter((r) => r.id !== relation.id);
            to.relations = to.relations.filter((r) => r.id !== relation.id);
            return;
          }

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const fromTable = schema.tables.find((t) => t.id === curr.from);
            const toTable = schema.tables.find((t) => t.id === curr.to);
            if (!fromTable || !toTable) return;

            fromTable.columns
              .filter((col) => col.keyType === 'PK' || col.keyType === 'PK/FK')
              .forEach((fromCol) => {
                if (
                  toTable.columns.find(
                    (toCol) =>
                      toCol.constraintName === curr.constraintName &&
                      toCol.path.join('') === [...fromCol.path, curr.constraintName].join('') &&
                      toCol.id === fromCol.id,
                  )
                )
                  return;

                let columnName = fromCol.name;
                const existingColumnNames = new Set(toTable.columns.map((c) => c.name));
                while (existingColumnNames.has(columnName)) {
                  const regex = /_(\d+)$/;
                  const match = columnName.match(regex);
                  const duplicatedNameCount = match ? parseInt(match[1], 10) + 1 : 1;
                  columnName = `${columnName.replace(/_\d+$/, '')}_${duplicatedNameCount}`;
                }

                toTable.columns.push({
                  ...fromCol,
                  name: columnName,
                  nullable: curr.identify ? false : curr.participation.to === 'PARTIAL',
                  keyType: curr.identify ? 'PK/FK' : 'FK',
                  constraintName: curr.constraintName,
                  path: [...fromCol.path, curr.constraintName],
                });
              });

            toTable.relations.filter((rel) => rel.from === toTable.id).forEach(dfs);
            visited[curr.id] = false;
          };

          if (relation.identify) {
            dfs(relation);
          } else {
            from.columns
              .filter(
                (col) =>
                  (col.keyType === 'PK' || col.keyType === 'PK/FK') &&
                  !to.columns.find(
                    (tableCol) => tableCol.constraintName === relation.constraintName && tableCol.id === col.id,
                  ),
              )
              .forEach((fromCol) => {
                let columnName = fromCol.name;
                const existingColumnNames = new Set(to.columns.map((c) => c.name));
                while (existingColumnNames.has(columnName)) {
                  const regex = /_(\d+)$/;
                  const match = columnName.match(regex);
                  const duplicatedNameCount = match ? parseInt(match[1], 10) + 1 : 1;
                  columnName = `${columnName.replace(/_\d+$/, '')}_${duplicatedNameCount}`;
                }

                to.columns.push({
                  ...fromCol,
                  name: columnName,
                  nullable: relation.identify ? false : relation.participation.to === 'PARTIAL',
                  keyType: relation.identify ? 'PK/FK' : 'FK',
                  constraintName: relation.constraintName,
                  path: [...fromCol.path, relation.constraintName],
                });
              });
          }
          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
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

          from.relations = from.relations.map((r) => (r.id === relation.id ? relation : r));
          to.relations = to.relations.map((r) => (r.id === relation.id ? relation : r));

          if (relation.identify && hasCycle(schema, relation)) {
            from.relations = from.relations.map((r) => (r.id === relation.id ? prevRelation : r));
            to.relations = from.relations.map((r) => (r.id === relation.id ? prevRelation : r));
            return;
          }

          // to.columns = to.columns.map((col) =>
          //   col.constraintName === relation.constraintName
          //     ? {
          //         ...col,
          //         nullable:
          //           relation.participation.to === 'PARTIAL'
          //             ? true
          //             : !relation.identify,
          //       }
          //     : col,
          // );

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
                    nullable: curr.participation.to === 'PARTIAL',
                  }
                : c,
            );

            toTable.relations.filter((rel) => rel.from === toTable.id).forEach(dfs);
          };
          dfs(relation);
          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
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

          const affectedColumns = to.columns.filter((c) => c.constraintName === relation.constraintName);

          const visited: Record<ERDRelation['id'], boolean> = {};
          const dfs = (curr: ERDRelation) => {
            if (visited[curr.id]) return;
            visited[curr.id] = true;

            const fromTable = schema.tables.find((t) => t.id === curr.from);
            const toTable = schema.tables.find((t) => t.id === curr.to);

            if (!fromTable || !toTable) return;

            toTable.columns = toTable.columns.filter(
              (c) => c.constraintName !== curr.constraintName || !affectedColumns.find((col) => col.id === c.id),
            );

            toTable.relations.filter((rel) => rel.from === toTable.id).forEach(dfs);
          };

          if (relation.identify) {
            dfs(relation);
          } else {
            const toTable = schema.tables.find((t) => t.id === relation.to);
            if (toTable) {
              toTable.columns = toTable.columns.filter((c) => c.constraintName !== relation.constraintName);
            }
          }
          get().updateTableInDiagram(schema);
          saveToLocalStorage(state.id, state);
        }),

      updateTableInDiagram: (schema) =>
        set((state) => {
          schema.diagrams.forEach((diagram) => {
            diagram.tables = diagram.tables.filter((table) => schema.tables.find((t) => t.id === table.id));
          });

          schema.tables.forEach((table) => {
            schema.diagrams.forEach((diagram) => {
              diagram.tables = diagram.tables.map((t) => (t.id === table.id ? { ...t, ...table } : t));
            });
          });

          saveToLocalStorage(state.id, state);
        }),

      fetchAndSetProject: async (projectId) => {
        const project = loadFromLocalStorage(projectId);
        const response = await getProjectAll({ projectId });
        const { projectName } = response.data.projectReturns[0];

        get().setProject({ ...initState, id: projectId, name: projectName, ...project });
      },

      generateDDL: (schemaName) => {
        const state = get();
        const schema = state.schemas.find((s) => s.name === schemaName);
        if (!schema) return '';

        let ddl = `CREATE SCHEMA ${schema.name};\n\n`;

        schema.tables.forEach((table) => {
          ddl += `-- ${table.title} 테이블\n`;
          ddl += `CREATE TABLE ${schema.name}.${table.title} (\n`;
          table.columns.forEach((column, index) => {
            ddl += `    ${column.name} ${column.type ?? 'TEXT'}${column.nullable ? '' : ' NOT NULL'}`;
            if (index < table.columns.length - 1) ddl += ',\n';
          });

          const primaryKeys = table.columns.filter((column) => column.keyType === 'PK' || column.keyType === 'PK/FK');
          if (primaryKeys.length > 0) {
            ddl += `,\n    PRIMARY KEY (${primaryKeys.map((pk) => pk.name).join(', ')})`;
          }

          const foreignKeys = table.relations
            .filter((relation) => relation.to === table.id)
            .map((relation) => {
              const fromTable = schema.tables.find((t) => t.id === relation.from);
              const toTable = schema.tables.find((t) => t.id === relation.to);
              if (fromTable && toTable) {
                const columns: { from: string; to: string }[] = [];
                toTable.columns
                  .filter((c) => c.constraintName === relation.constraintName)
                  .forEach((toColumn) => {
                    const fromColumn = table.columns.find((c) => c.id === toColumn.id);
                    if (fromColumn) columns.push({ from: fromColumn.name, to: toColumn.name });
                  });

                return `    CONSTRAINT ${relation.constraintName} FOREIGN KEY (${columns.map((c) => c.to).join(', ')}) REFERENCES ${schema.name}.${fromTable.title}(${columns.map((c) => c.from).join(', ')})`;
              }
              return '';
            })
            .filter((fk) => fk !== '');

          if (foreignKeys.length > 0) {
            ddl += `,\n${foreignKeys.join(',\n')}`;
          }

          ddl += `\n);\n\n`;
        });

        return ddl;
      },
    })),
  );
