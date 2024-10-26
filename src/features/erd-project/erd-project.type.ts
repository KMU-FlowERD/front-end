export type KeyType = 'PK' | 'FK' | 'PK/FK';

export type Participation = 'OPTIONAL' | 'FULL';

export type Cardinality = 'ONE' | 'MANY';

type Position = {
  top: number;
  left: number;
};

export type WithPosition<T> = Position & T;

export interface Column {
  id: string;
  type?: string;
  name: string;
  nullable: boolean;
  keyType?: KeyType;
}

export interface Table {
  id: string;
  title: string;
  width: number;
  height: number;
  columns: Column[];
}

export interface Relation {
  id: string;
  from: Table['id'];
  to: Table['id'];
  cardinality?: Cardinality;
  identify: boolean;
  participation: {
    from?: Participation;
    to: Participation;
  };
}

export interface Schema {
  name: string;
  tables: Table[];
}

export interface Diagram {
  name: string;
  tables: WithPosition<Table>[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  width: number;
  height: number;
  schemas: Schema[];
  diagrams: Diagram[];
  relations: Record<Table['id'], Relation[]>;
}
