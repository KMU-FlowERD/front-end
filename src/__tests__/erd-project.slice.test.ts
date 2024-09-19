import { describe, expect, test } from '@jest/globals';

import {
  createERDProjectStore,
  ERDRelation,
  type ERDTable,
} from '@/features/erd-project';

describe('사용자의 프로젝트 관련 데이터 테스트', () => {
  const table1: ERDTable = {
    id: 'table1',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  };
  const table2: ERDTable = {
    id: 'table2',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  };
  const relation: ERDRelation = {
    id: 'relation1',
    type: 'one-to-one',
    from: table1.id,
    to: table2.id,
    identify: false,
  };

  describe('Project 관련', () => {
    test('Project 설명이 정상적으로 변경되어야 합니다.', () => {
      const store = createERDProjectStore();

      store
        .getState()
        .updateDescriptions({ title: 'title', description: 'description' });

      expect(store.getState().title).toBe('title');
      expect(store.getState().description).toBe('description');
    });

    test('Project의 캔버스 크기가 변경되어야 합니다.', () => {
      const store = createERDProjectStore();

      store.getState().updateCanvasSize({ width: 100, height: 100 });

      expect(store.getState().width).toBe(100);
      expect(store.getState().height).toBe(100);
    });

    test('Project의 캔버스 크기가 0 또는 음수인 경우 오류를 반환합니다.', () => {
      const store = createERDProjectStore();

      expect(() =>
        store.getState().updateCanvasSize({ width: -1, height: -1 }),
      ).toThrowError(new Error('width, height must greater than 0'));
    });
  });

  describe('ERD Table 관련', () => {
    test('Table 추가가 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();

      store.getState().createTable(table1);

      expect(store.getState().tables.length).toBe(1);
    });

    test('Table 업데이트가 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);

      store.getState().updateTable({ ...table1, top: 100, height: 100 });

      const table = store.getState().tables.find((t) => t.id === table1.id);
      expect(table).not.toBeUndefined();
      expect(table?.top).toBe(100);
      expect(table?.height).toBe(100);
    });

    test('Table 삭제가 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();
      store.getState().createTable(table1);

      store.getState().deleteTable(table1.id);

      expect(store.getState().tables.length).toBe(0);
    });
  });

  describe('ERD Relation 관련', () => {
    test('Relation 생성이 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();

      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);

      expect(store.getState().relations[table1.id]).not.toBeUndefined();
      expect(store.getState().relations[table2.id]).not.toBeUndefined();
    });

    test('Relation 수정이 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();

      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);
      store.getState().updateRelation({ ...relation, identify: true });

      const target = store
        .getState()
        .relations[table1.id].find((v) => v.id === relation.id);

      expect(target).not.toBeUndefined();
      expect(target?.identify).toBe(true);
    });

    test('Relation 삭제가 정상적으로 이루어져야 합니다.', () => {
      const store = createERDProjectStore();

      store.getState().createTable(table1);
      store.getState().createTable(table2);
      store.getState().createRelation(relation);
      store.getState().deleteRelation(relation);

      expect(store.getState().relations[table1.id]).not.toBeUndefined();
      expect(store.getState().relations[table2.id]).not.toBeUndefined();
      expect(store.getState().relations[table1.id].length).toBe(0);
      expect(store.getState().relations[table2.id].length).toBe(0);
    });
  });
});
