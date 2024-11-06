export type KeyType = 'PK' | 'FK' | 'PK/FK';

export type Participation = 'PARTIAL' | 'FULL';

export type Cardinality = 'ONE' | 'MANY';

export type Position = {
  top: number;
  left: number;
};

export type WithPosition<T> = Position & T;

export interface ERDColumn {
  id: string;
  type?: string;
  name: string;
  nullable: boolean;
  keyType?: KeyType;
  constraintName?: string;
}

export interface ERDTable {
  id: string;
  title: string;
  width: number;
  height: number;
  columns: ERDColumn[];
  relations: Relation[];
}

export interface Relation {
  id: string;
  from: ERDTable['id'];
  to: ERDTable['id'];
  cardinality?: {
    from: Cardinality;
    to: Cardinality;
  };
  identify: boolean;
  participation: {
    from?: Participation;
    to: Participation;
  };
  constraintName: string;
}

export interface ERDSchema {
  name: string;
  tables: ERDTable[];
  diagrams: ERDDiagram[];
}

export interface ERDDiagram {
  name: string;
  tables: WithPosition<ERDTable>[];
  width: number;
  height: number;
}

export interface ERDProject {
  id: string;
  name: string;
  description?: string;
  schemas: ERDSchema[];
}
