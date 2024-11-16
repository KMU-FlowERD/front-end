import { describe, expect, test } from '@jest/globals';
import {
  createERDProjectStore,
  ERDDiagram,
  ERDRelation,
  ERDSchema,
  ERDTable,
} from '@/features/erd-project';
import exp from 'constants';

describe('ERD Project Store', () => {
  const _schema: ERDSchema = {
    name: 'schema1',
    tables: [],
    diagrams: [],
  };

  const _diagram: ERDDiagram = {
    name: 'diagram1',
    width: 1000,
    height: 1000,
    tables: [],
  };

  const _table1: ERDTable = {
    id: 'table1',
    title: 'Table1',
    width: 100,
    height: 100,
    columns: [],
    relations: [],
  };

  const _table2: ERDTable = {
    id: 'table2',
    title: 'Table2',
    width: 100,
    height: 100,
    columns: [],
    relations: [],
  };

  const _table3: ERDTable = {
    id: 'table3',
    title: 'Table3',
    width: 100,
    height: 100,
    columns: [],
    relations: [],
  };

  const _relation1: ERDRelation = {
    id: 'relation1',
    from: 'table1',
    to: 'table2',
    cardinality: {
      from: 'ONE',
      to: 'MANY',
    },
    identify: true,
    participation: {
      from: 'FULL',
      to: 'FULL',
    },
    constraintName: 'FK_Table2_Table1_1',
  };

  const _relation2: ERDRelation = {
    id: 'relation2',
    from: 'table2',
    to: 'table3',
    cardinality: {
      from: 'ONE',
      to: 'MANY',
    },
    identify: true,
    participation: {
      from: 'FULL',
      to: 'FULL',
    },
    constraintName: 'FK_Table3_Table2_1',
  };

  const _relation3: ERDRelation = {
    id: 'relation3',
    from: 'table3',
    to: 'table1',
    cardinality: {
      from: 'ONE',
      to: 'MANY',
    },
    identify: true,
    participation: {
      from: 'FULL',
      to: 'FULL',
    },
    constraintName: 'FK_Table1_Table3_1',
  };

  test('두 테이블이 연결 되어있을 때, 테이블이 삭제되면 관련된 연결 관계들이 모두 삭제되어야 한다. (부모를 삭제)', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.relations.length).toBe(1);
    expect(table2?.relations.length).toBe(1);

    store.getState().deleteTable(_schema.name, table1!.id);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable1).toBeUndefined();
    expect(afterTable2?.relations.length).toBe(0);
  });

  test('두 테이블이 연결 되어있을 때, 테이블이 삭제되면 관련된 연결 관계들이 모두 삭제되어야 한다. (자식을 삭제)', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.relations.length).toBe(1);
    expect(table2?.relations.length).toBe(1);

    store.getState().deleteTable(_schema.name, table2!.id);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable1?.relations.length).toBe(0);
    expect(afterTable2).toBeUndefined();
  });

  test('두 테이블이 식별 관계로 연결 되어있을 때, PK 컬럼을 추가하면 다른 테이블에 영향을 미친다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createColumn(_schema.name, _table1!, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.columns.length).toBe(1);
    expect(table2?.columns.length).toBe(1);
  });

  test('두 테이블이 식별 관계로 연결 되어있을 때, PK 컬럼을 삭제하면 다른 테이블에 영향을 미친다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.columns.length).toBe(1);
    expect(table2?.columns.length).toBe(1);

    store.getState().deleteColumn(_schema.name, _table1, table1!.columns[0]);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable1?.columns.length).toBe(0);
    expect(afterTable2?.columns.length).toBe(0);
  });

  test('두 테이블이 식별 관계로 연결 되어있을 때, PK 컬럼을 수정하면 다른 테이블에 영향을 미친다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createColumn(_schema.name, _table1, true);

    const column = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id)?.columns[0];

    store.getState().updateColumn(_schema.name, _table1, {
      ...column!,
      type: 'VARCHAR',
    });

    const afterColumn = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id)?.columns[0];

    expect(afterColumn?.type).toBe('VARCHAR');
  });

  test('두 테이블이 비식별 관계로 연결 되어 있고, FK가 하나라도 NULL 허용으로 변경되면 같은 키는 전부 NULL 허용으로 변경되고, 관계의 참여 정보는 부분 참여로 변경되어야 한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store
      .getState()
      .createRelation(_schema.name, { ..._relation1, identify: false });
    store.getState().createColumn(_schema.name, _table1, true);
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.relations.length).toBe(1);
    expect(table2?.relations.length).toBe(1);
    expect(table1?.columns.filter((c) => c.keyType === 'PK').length).toBe(2);
    expect(table2?.columns.filter((c) => c.keyType === 'FK').length).toBe(2);
    expect(table2?.columns.filter((c) => c.nullable).length).toBe(0);

    store.getState().updateColumn(_schema.name, _table2, {
      ...table2!.columns[0],
      nullable: true,
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.filter((c) => c.keyType === 'FK').length).toBe(
      2,
    );
    expect(afterTable2?.columns.filter((c) => c.nullable).length).toBe(2);
    expect(afterTable2?.relations[0].participation.to).toBe('PARTIAL');
  });

  test('두 테이블이 비식별 관계로 연결 되어 있고, FK가 하나라도 NULL 비허용으로 변경되면 같은 키는 전부 NULL 불가로 변경되고, 관계의 참여 정보는 전체 참여로 변경되어야 한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store
      .getState()
      .createRelation(_schema.name, { ..._relation1, identify: false });
    store.getState().createColumn(_schema.name, _table1, true);
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    store.getState().updateColumn(_schema.name, _table2, {
      ...table2!.columns[0],
      nullable: true,
    });

    const beforeTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.relations.length).toBe(1);
    expect(beforeTable2?.relations.length).toBe(1);
    expect(table1?.columns.filter((c) => c.keyType === 'PK').length).toBe(2);
    expect(beforeTable2?.columns.filter((c) => c.keyType === 'FK').length).toBe(
      2,
    );
    expect(beforeTable2?.columns.filter((c) => c.nullable).length).toBe(2);

    store.getState().updateColumn(_schema.name, _table2, {
      ...table2!.columns[0],
      nullable: false,
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.filter((c) => c.keyType === 'FK').length).toBe(
      2,
    );
    expect(afterTable2?.columns.filter((c) => c.nullable).length).toBe(0);
    expect(afterTable2?.relations[0].participation.to).toBe('FULL');
  });

  test('연결 되어있지 않은 두 테이블이 연결되면, 자식 테이블은 부모 테이블의 PK를 PK/FK로 추가한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.columns.length).toBe(1);
    expect(table2?.columns.length).toBe(0);

    store.getState().createRelation(_schema.name, _relation1);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable1?.columns.length).toBe(1);
    expect(afterTable2?.columns.length).toBe(1);
  });

  test('연결 되어있던 두 테이블이 연결을 해제하면, 자식 테이블은 부모 테이블의 PK를 삭제한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createColumn(_schema.name, _table1, true);
    store.getState().createRelation(_schema.name, _relation1);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table1?.columns.length).toBe(1);
    expect(table2?.columns.length).toBe(1);

    store.getState().deleteRelation(_schema.name, _relation1);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable1?.columns.length).toBe(1);
    expect(afterTable2?.columns.length).toBe(0);
  });

  test('연결 되어있던 두 테이블의 관계가 식별에서 비식별로 변경되면 자식 테이블은 부모 테이블의 PK를 FK로 변경한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const column = table1?.columns.find((c) => c.keyType === 'PK');

    expect(table2?.columns.find((c) => c.id === column?.id)?.keyType).toBe(
      'PK/FK',
    );

    store.getState().updateRelation(_schema.name, {
      ..._relation1,
      identify: false,
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.find((c) => c.id === column?.id)?.keyType).toBe(
      'FK',
    );
  });

  test('연결 되어있던 두 테이블의 관계가 비식별에서 식별로 변경되면 자식 테이블은 부모 테이블의 PK를 PK/FK로 변경한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store
      .getState()
      .createRelation(_schema.name, { ..._relation1, identify: false });
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const column = table1?.columns.find((c) => c.keyType === 'PK');

    expect(table2?.columns.find((c) => c.id === column?.id)?.keyType).toBe(
      'FK',
    );

    store.getState().updateRelation(_schema.name, {
      ..._relation1,
      identify: true,
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.find((c) => c.id === column?.id)?.keyType).toBe(
      'PK/FK',
    );
  });

  test('연결 되어있던 두 테이블의 관계가 자식 테이블의 참여 정보가 부분 참여로 변경되면 자식 테이블의 FK를 NULL 가능으로 변경한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      identify: false,
    });
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const column = table1?.columns.find((c) => c.keyType === 'PK');

    expect(table2?.columns.find((c) => c.id === column?.id)?.nullable).toBe(
      false,
    );

    store.getState().updateRelation(_schema.name, {
      ..._relation1,
      identify: false,
      participation: { from: 'PARTIAL', to: 'PARTIAL' },
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(
      afterTable2?.columns.find((c) => c.id === column?.id)?.nullable,
    ).toBe(true);
  });

  test('연결 되어있던 두 테이블의 관계가 자식 테이블의 참여 정보가 전체 참여로 변경되면 자식 테이블의 FK를 NULL 불가능으로 변경한다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      identify: false,
      participation: { from: 'PARTIAL', to: 'PARTIAL' },
    });
    store.getState().createColumn(_schema.name, _table1, true);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const column = table1?.columns.find((c) => c.keyType === 'PK');

    expect(table2?.columns.find((c) => c.id === column?.id)?.nullable).toBe(
      true,
    );

    store.getState().updateRelation(_schema.name, {
      ..._relation1,
      identify: false,
      participation: { from: 'PARTIAL', to: 'FULL' },
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(
      afterTable2?.columns.find((c) => c.id === column?.id)?.nullable,
    ).toBe(false);
  });

  test('테이블이 모두 식별 관계로 연결되어 사이클을 형성할 수 없습니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createTable(_schema.name, _table3);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createRelation(_schema.name, _relation2);
    store.getState().createRelation(_schema.name, _relation3);

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const table3 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table3.id);

    expect(table1?.relations.length).toBe(1);
    expect(table2?.relations.length).toBe(2);
    expect(table3?.relations.length).toBe(1);
  });

  test('테이블이 식별 관계로 연결되더라도, 비식별로 인해서 사이클이 형셩된다면, 가능합니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createTable(_schema.name, _table3);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createRelation(_schema.name, _relation2);
    store
      .getState()
      .createRelation(_schema.name, { ..._relation3, identify: false });

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const table3 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table3.id);

    expect(table1?.relations.length).toBe(2);
    expect(table2?.relations.length).toBe(2);
    expect(table3?.relations.length).toBe(2);
  });

  test('테이블이 식별 관계로 연결되더라도, 비식별로 인해서 사이클이 형성이 되었을 때, 다시 식별로 변경이 불가능해야 합니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createTable(_schema.name, _table3);
    store.getState().createRelation(_schema.name, _relation1);
    store.getState().createRelation(_schema.name, _relation2);
    store
      .getState()
      .createRelation(_schema.name, { ..._relation3, identify: false });

    const table1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const table3 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table3.id);

    expect(table1?.relations.length).toBe(2);
    expect(table2?.relations.length).toBe(2);
    expect(table3?.relations.length).toBe(2);

    store.getState().updateRelation(_schema.name, {
      ..._relation3,
      identify: true,
    });

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    const afterTable3 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table3.id);

    expect(afterTable1?.relations.length).toBe(2);
    expect(afterTable2?.relations.length).toBe(2);
    expect(afterTable3?.relations.length).toBe(2);
  });

  test('테이블이 업데이트 되었을 때, 정상적으로 다이어그램에 업데이트 되어야 합니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createDiagram(_schema.name, _diagram);
    store.getState().createTable(_schema.name, _table1);
    store.getState().insertTableIntoDiagram(_schema.name, _diagram.name, {
      ..._table1,
      left: 0,
      top: 0,
    });
    store
      .getState()
      .updateTable(_schema.name, { ..._table1, title: 'Changed' });

    const schemaTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table1.id);

    const afterTable1 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.diagrams.find((d) => d.name === _diagram.name)
      ?.tables.find((t) => t.id === _table1.id);

    expect(schemaTable1?.title).toBe('Changed');
    expect(afterTable1?.title).toBe('Changed');
  });

  test('하나의 테이블에 다른 테이블에 여러 관계가 있을 때 하나의 관계를 삭제하면 하나의 컬럼만 삭제되어야 합니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createColumn(_schema.name, _table1, true);
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '1',
      identify: false,
      constraintName: 'FK_Table2_Table1_1',
    });
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '2',
      identify: false,
      constraintName: 'FK_Table2_Table1_2',
    });
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '3',
      identify: false,
      constraintName: 'FK_Table2_Table1_3',
    });

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table2?.columns.length).toBe(3);

    store.getState().deleteRelation(_schema.name, {
      ..._relation1,
      id: '1',
      constraintName: 'FK_Table2_Table1_1',
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.length).toBe(2);
  });

  test('하나의 테이블에 다른 테이블에 여러 관계가 있을 때 하나의 관계를 업데이트하면 하나의 컬럼만 수정되어야 합니다.', () => {
    const store = createERDProjectStore();
    store.getState().createSchema(_schema);
    store.getState().createTable(_schema.name, _table1);
    store.getState().createTable(_schema.name, _table2);
    store.getState().createColumn(_schema.name, _table1, true);
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '1',
      identify: false,
      constraintName: 'FK_Table2_Table1_1',
    });
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '2',
      identify: false,
      constraintName: 'FK_Table2_Table1_2',
    });
    store.getState().createRelation(_schema.name, {
      ..._relation1,
      id: '3',
      identify: false,
      constraintName: 'FK_Table2_Table1_3',
    });

    const table2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(table2?.columns.length).toBe(3);
    expect(table2?.columns[0].nullable).toBe(false);
    expect(table2?.columns[1].nullable).toBe(false);
    expect(table2?.columns[2].nullable).toBe(false);

    store.getState().updateRelation(_schema.name, {
      ..._relation1,
      id: '1',
      identify: false,
      constraintName: 'FK_Table2_Table1_1',
      participation: {
        to: 'PARTIAL',
      },
    });

    const afterTable2 = store
      .getState()
      .schemas.find((s) => s.name === _schema.name)
      ?.tables.find((t) => t.id === _table2.id);

    expect(afterTable2?.columns.length).toBe(3);
    expect(afterTable2?.columns[0].nullable).toBe(true);
    expect(afterTable2?.columns[1].nullable).toBe(false);
    expect(afterTable2?.columns[2].nullable).toBe(false);
  });
});
