import { describe, expect, test } from '@jest/globals';
import {
  createERDProjectStore,
  ERDProject,
  ERDRelation,
  ERDTable,
} from '@/features/erd-project';

describe('ERD Project Store', () => {
  const table1: ERDTable = {
    id: 'table1',
    title: 'Table 1',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    columns: [],
  };

  const table2: ERDTable = {
    id: 'table2',
    title: 'Table 2',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    columns: [],
  };

  const relation: ERDRelation = {
    id: 'relation1',
    from: 'table1',
    to: 'table2',
    cardinality: 'ONE-TO-ONE',
    identify: true,
    participation: {
      to: 'FULL',
    },
  };

  describe('프로젝트 관련 액션', () => {
    test('프로젝트를 설정합니다.', () => {
      const store = createERDProjectStore();
      const newProject: ERDProject = {
        id: 'newProject',
        title: 'New Project',
        width: 500,
        height: 500,
        tables: [],
        relations: {},
      };

      store.getState().setProject(newProject);
      expect(store.getState().id).toBe('newProject');
      expect(store.getState().title).toBe('New Project');
    });

    test('프로젝트 설명을 업데이트합니다.', () => {
      const store = createERDProjectStore();
      store.getState().updateDescriptions({
        title: 'Updated Title',
        description: 'Updated Description',
      });

      expect(store.getState().title).toBe('Updated Title');
      expect(store.getState().description).toBe('Updated Description');
    });

    test('캔버스 크기를 업데이트합니다.', () => {
      const store = createERDProjectStore();
      store.getState().updateCanvasSize({ width: 800, height: 600 });

      expect(store.getState().width).toBe(800);
      expect(store.getState().height).toBe(600);

      expect(() =>
        store.getState().updateCanvasSize({ width: -100, height: 600 }),
      ).toThrow();
    });
  });

  describe('테이블 관련 액션', () => {
    test('테이블을 생성합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);

      expect(store.getState().tables.length).toBe(1);
      expect(store.getState().tables[0].title).toBe('Table 1');
    });

    test('테이블을 업데이트합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);

      const updatedTable = { ...table1, title: 'Updated Table 1' };
      store.getState().updateTable(updatedTable);

      expect(store.getState().tables[0].title).toBe('Updated Table 1');
    });

    test('테이블을 삭제합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().deleteTable(table1.id);

      expect(store.getState().tables.length).toBe(0);
    });

    test('테이블을 삭제하는 것은, 다른 테이블에 영향을 미칠 수 있습니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation(relation);

      const beforeTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(beforeTable2?.columns.length).toBe(1);

      store.getState().deleteTable(table1.id);

      const afterTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(store.getState().tables.length).toBe(1);
      expect(afterTable2?.columns.length).toBe(0);
    });
  });

  describe('컬럼 관련 액션', () => {
    test('컬럼을 생성합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createColumn(table1, true);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 1');

      expect(table).not.toBeUndefined();
      expect(table?.columns.length).toBe(1);
    });

    test('PK인 컬럼이 추가되면, 릴레이션에 따라 영향을 미칩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      expect(
        store.getState().tables.find((t) => t.id === table1.id)?.columns.length,
      ).toBe(0);
      expect(
        store.getState().tables.find((t) => t.id === table2.id)?.columns.length,
      ).toBe(0);

      store.getState().createColumn(table1, true);

      expect(
        store.getState().tables.find((t) => t.id === table1.id)?.columns.length,
      ).toBe(1);
      expect(
        store.getState().tables.find((t) => t.id === table2.id)?.columns.length,
      ).toBe(1);
    });

    test('PK가 아닌 컬럼이 추가되면, 릴레이션과 상관 없이 영향을 미쳐선 안 됩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      expect(
        store.getState().tables.find((t) => t.id === table1.id)?.columns.length,
      ).toBe(0);
      expect(
        store.getState().tables.find((t) => t.id === table2.id)?.columns.length,
      ).toBe(0);

      store.getState().createColumn(table1, false);

      expect(
        store.getState().tables.find((t) => t.id === table1.id)?.columns.length,
      ).toBe(1);
      expect(
        store.getState().tables.find((t) => t.id === table2.id)?.columns.length,
      ).toBe(0);
    });

    test('컬럼을 업데이트합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createColumn(table1, true);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 1');
      const column = table?.columns[0];
      if (column) {
        const updatedColumn = { ...column, name: 'Updated Column' };
        store.getState().updateColumn(table1, updatedColumn);

        const updatedTable = store
          .getState()
          .tables.find((table) => table.title === 'Table 1');
        const updatedCol = updatedTable?.columns.find(
          (col) => col.id === column.id,
        );
        expect(updatedCol?.name).toBe('Updated Column');
      }
    });

    test('테이블1의 컬럼이 업데이트되면 테이블2에 영향을 미칩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation(relation);

      const table = store.getState().tables.find((t) => t.id === 'table1');
      expect(table).not.toBeUndefined();

      const column = table?.columns[0];
      expect(column).not.toBeUndefined();

      store.getState().updateColumn(table!, { ...column!, name: 'test-name' });

      const updatedTable1 = store
        .getState()
        .tables.find((t) => t.id === 'table1');
      const updatedTable2 = store
        .getState()
        .tables.find((t) => t.id === 'table2');

      const updatedColumn1 = updatedTable1?.columns.find(
        (c) => c.name === 'test-name',
      );
      const updatedColumn2 = updatedTable2?.columns.find(
        (c) => c.name === 'test-name',
      );

      expect(updatedColumn1).not.toBeUndefined();
      expect(updatedColumn2).not.toBeUndefined();
      expect(updatedColumn1!.name).toBe('test-name');
      expect(updatedColumn2!.name).toBe('test-name');
    });

    test('테이블2의 FK인 컬럼이 nullable로 변경되면, 테이블1과의 관계의 참여 정보가 부분참여로 변경되어야합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumn = store
        .getState()
        .tables.find((t) => t.id === table2.id)?.columns[0];

      expect(targetColumn).not.toBeUndefined();
      expect(targetColumn!.nullable).toBe(false);

      store
        .getState()
        .updateColumn(table2, { ...targetColumn!, nullable: true });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('OPTIONAL');
    });

    test('테이블2의 FK인 컬럼이 nullable에서 non-null로 변경되면, 테이블1과의 관계의 참여 정보가 전체참여로 변경되어야합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumn = store
        .getState()
        .tables.find((t) => t.id === table2.id)?.columns[0];

      store
        .getState()
        .updateColumn(table2, { ...targetColumn!, nullable: true });

      const updatedColumn = store
        .getState()
        .tables.find((t) => t.id === table2.id)?.columns[0];

      expect(updatedColumn).not.toBeUndefined();
      expect(updatedColumn!.nullable).toBe(true);

      store
        .getState()
        .updateColumn(table2, { ...updatedColumn!, nullable: false });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('MANDATORY');
    });

    test('테이블2의 FK인 컬럼이 여러 개이고, 이 중 모두가 nullable로 변경되면, 테이블1과의 관계의 참여 정보가 부분참여로 변경되어야합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumns = store
        .getState()
        .tables.find((t) => t.id === table2.id)
        ?.columns.filter((col) => col.keyType === 'FK');

      expect(targetColumns).not.toBeUndefined();
      targetColumns?.forEach((col) => {
        expect(col.nullable).toBe(false);
      });

      targetColumns?.forEach((col) => {
        store.getState().updateColumn(table2, { ...col, nullable: true });
      });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('OPTIONAL');
    });

    test('테이블2의 FK인 컬럼이 여러 개이고, 이 중 하나만 nullable로 변경되면, 테이블1과의 관계의 참여 정보가 변경되지 않아야 합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumns = store
        .getState()
        .tables.find((t) => t.id === table2.id)
        ?.columns.filter((col) => col.keyType === 'FK');

      expect(targetColumns).not.toBeUndefined();
      targetColumns?.forEach((col) => {
        expect(col.nullable).toBe(false);
      });

      targetColumns?.forEach((col, index) => {
        if (index > 0) return;
        store.getState().updateColumn(table2, { ...col, nullable: true });
      });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('MANDATORY');
    });

    test('테이블2의 FK인 컬럼이 여러 개이고, 이 중 모두가 non-null로 변경되면, 테이블1과의 관계의 참여 정보가 전체참여로 변경되어야합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumns = store
        .getState()
        .tables.find((t) => t.id === table2.id)
        ?.columns.filter((col) => col.keyType === 'FK');

      expect(targetColumns).not.toBeUndefined();
      targetColumns?.forEach((col) => {
        expect(col.nullable).toBe(false);
      });

      targetColumns?.forEach((col) => {
        store.getState().updateColumn(table2, { ...col, nullable: true });
      });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('OPTIONAL');

      targetColumns?.forEach((col) => {
        store.getState().updateColumn(table2, { ...col, nullable: false });
      });

      const updatedRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(updatedRelation).not.toBeUndefined();
      expect(updatedRelation!.participation!.to).toBe('MANDATORY');
    });

    test('테이블2의 FK인 컬럼이 여러 개이고, 이 중 하나만 non-null로 변경되면, 테이블1과의 관계의 참여 정보가 전체참여로 유지되어야 합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
        participation: {
          from: 'OPTIONAL',
          to: 'FULL',
        },
      });

      const targetColumns = store
        .getState()
        .tables.find((t) => t.id === table2.id)
        ?.columns.filter((col) => col.keyType === 'FK');

      expect(targetColumns).not.toBeUndefined();
      targetColumns?.forEach((col) => {
        expect(col.nullable).toBe(false);
      });

      targetColumns?.forEach((col) => {
        store.getState().updateColumn(table2, { ...col, nullable: true });
      });

      const targetRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(targetRelation).not.toBeUndefined();
      expect(targetRelation!.participation!.to).toBe('OPTIONAL');

      targetColumns?.forEach((col, index) => {
        if (index > 0) return;
        store.getState().updateColumn(table2, { ...col, nullable: false });
      });

      const updatedRelation = store
        .getState()
        .relations[table2.id].find((rel) => rel.id === relation.id);

      expect(updatedRelation).not.toBeUndefined();
      expect(updatedRelation!.participation!.to).toBe('MANDATORY');
    });

    test('컬럼을 삭제합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createColumn(table1, true);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 1');
      const column = table?.columns[0];
      if (column) {
        store.getState().deleteColumn(table1, column);

        const updatedTable = store
          .getState()
          .tables.find((table) => table.title === 'Table 1');
        expect(updatedTable?.columns.length).toBe(0);
      }
    });

    test('컬럼을 삭제하면, PK인 경우 릴레이션에 따라 영향을 미칩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);
      store.getState().createColumn(table1, true);

      const table1Before = store
        .getState()
        .tables.find((t) => t.id === 'table1');
      const table2Before = store
        .getState()
        .tables.find((t) => t.id === 'table2');
      expect(table1Before?.columns.length).toBe(1);
      expect(table2Before?.columns.length).toBe(1);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 1');
      const column = table?.columns[0];
      if (column) {
        store.getState().deleteColumn(table1, column);

        const updatedTable1 = store
          .getState()
          .tables.find((t) => t.id === 'table1');
        const updatedTable2 = store
          .getState()
          .tables.find((t) => t.id === 'table2');

        expect(updatedTable1?.columns.length).toBe(0);
        expect(updatedTable2?.columns.length).toBe(0);
      }
    });

    test('컬럼을 삭제하면, PK가 아닌 경우 릴레이션과 상관 없이 영향을 미쳐선 안 됩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);
      store.getState().createColumn(table1, false);

      const table1Before = store
        .getState()
        .tables.find((t) => t.id === 'table1');
      const table2Before = store
        .getState()
        .tables.find((t) => t.id === 'table2');
      expect(table1Before?.columns.length).toBe(1);
      expect(table2Before?.columns.length).toBe(0);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 1');
      const column = table?.columns[0];
      if (column) {
        store.getState().deleteColumn(table1, column);

        const updatedTable1 = store
          .getState()
          .tables.find((t) => t.id === 'table1');
        const updatedTable2 = store
          .getState()
          .tables.find((t) => t.id === 'table2');

        expect(updatedTable1?.columns.length).toBe(0);
        expect(updatedTable2?.columns.length).toBe(0);
      }
    });
  });

  describe('릴레이션 관련 액션', () => {
    test('릴레이션을 생성합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      expect(store.getState().relations[table1.id].length).toBe(1);
      expect(store.getState().relations[table2.id].length).toBe(1);
    });

    test('릴레이션이 생성되면 다른 테이블의 컬럼에 영향을 미칩니다. 이 경우엔 식별 관계입니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table2, true);
      store.getState().createRelation(relation);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 2');

      expect(table).not.toBeUndefined();
      expect(table?.columns.length).toBe(2);
    });

    test('릴레이션이 생성되면 다른 테이블의 컬럼에 영향을 미칩니다. 이 경우엔 비식별 관계입니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table2, true);
      store.getState().createRelation({
        ...relation,
        identify: false,
      });

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 2');

      expect(table).not.toBeUndefined();
      expect(table?.columns.length).toBe(2);
    });

    test('릴레이션을 업데이트합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      const updatedRelation: ERDRelation = {
        ...relation,
        cardinality: 'ONE-TO-MANY',
      };
      store.getState().updateRelation(updatedRelation);

      const updatedRel = store
        .getState()
        .relations[table1.id].find((rel) => rel.id === relation.id);
      expect(updatedRel?.cardinality).toBe('ONE-TO-MANY');
    });

    test('릴레이션의 식별/비식별이 변경되면, 다른 테이블에 영향을 미치게됩니다. 식별 → 비식별', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation(relation);

      const beforeTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(beforeTable2?.columns.length).toBe(1);
      expect(beforeTable2?.columns[0].keyType).toBe('PK/FK');

      store.getState().updateRelation({ ...relation, identify: false });

      const afterTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(afterTable2?.columns.length).toBe(1);
      expect(afterTable2?.columns[0].keyType).toBe('FK');
    });

    test('릴레이션의 식별/비식별이 변경되면, 다른 테이블에 영향을 미치게됩니다. 비식별 → 식별', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createRelation({ ...relation, identify: false });

      const beforeTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(beforeTable2?.columns.length).toBe(1);
      expect(beforeTable2?.columns[0].keyType).toBe('FK');

      store.getState().updateRelation({ ...relation, identify: true });

      const afterTable2 = store
        .getState()
        .tables.find((table) => table.id === relation.to);

      expect(afterTable2?.columns.length).toBe(1);
      expect(afterTable2?.columns[0].keyType).toBe('PK/FK');
    });

    test('릴레이션을 삭제합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      store.getState().deleteRelation(relation);

      expect(store.getState().relations[table1.id].length).toBe(0);
      expect(store.getState().relations[table2.id].length).toBe(0);
    });

    test('릴레이션을 삭제하면, 다른 테이블의 컬럼에 영향을 미칩니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createColumn(table1, true);
      store.getState().createColumn(table2, true);
      store.getState().createRelation(relation);

      const table = store
        .getState()
        .tables.find((table) => table.title === 'Table 2');

      expect(table).not.toBeUndefined();
      expect(table?.columns.length).toBe(2);

      store.getState().deleteRelation(relation);

      const updatedTable = store
        .getState()
        .tables.find((table) => table.title === 'Table 2');
      expect(updatedTable?.columns.length).toBe(1);
    });
  });
});
