export interface Project {
  id: string;
  projectName: string;
}

export interface PutUpdateProjectRequest {
  projectId: string;
  body: {
    projectName: string;
  };
}

export interface PutUpdateProjectResponse {
  status: string;
  data: object;
  message: string;
}

export interface GetProjectListResponse {
  status: string;
  data: Project[];
  message: string;
}

export interface PostAddProjectRequest {
  projectName: string;
}

export interface PostAddProjectResponse {
  status: string;
  data: string;
  message: string;
}

export interface GetProjectRequest {
  projectId: string;
}

export interface GetProjectResponse {
  status: string;
  data: {
    id: string;
    projectName: string;
    schemaReturns: Array<{
      schemaId: string;
      schemaName: string;
      tableReturns: Array<{
        id: string;
        tableName: string;
        columns: Array<{
          id: string;
          columnName: string;
          nullable: boolean;
          unique: boolean;
          path: string;
          constraintName: string;
          isKey: 'PRIMARY_KEY' | 'PRIMARY_KEY_AND_FOREIGN_KEY' | 'FOREIGN_KEY' | 'NORMAL';
          dataType: string;
          length: number;
        }>;
        constraints: Array<{
          id: string;
          childTableId: string;
          childColumnId: string;
          parentTableId: string;
          parentColumnId: string;
          parentParticipation: string;
          childParticipation: string;
          parentCardinality: string;
          childCardinality: string;
          relType: string;
        }>;
      }>;
    }>;
  };
  message: string;
}

export interface GetProjectAllRequest {
  projectId: string;
}

export interface GetProjectAllResponse {
  status: string;
  data: {
    projectReturns: Array<{
      id: string;
      projectName: string;
      schemaReturns: Array<{
        schemaId: string;
        schemaName: string;
        tableReturns: Array<{
          id: string;
          tableName: string;
          columns: Array<{
            id: string;
            path: string;
            constraintName: string;
            columnName: string;
            nullable: boolean;
            unique: boolean;
            isKey: 'PRIMARY_KEY' | 'PRIMARY_KEY_AND_FOREIGN_KEY' | 'FOREIGN_KEY' | 'NORMAL';
            dataType: string;
            length: number;
          }>;
          constraints: Array<{
            id: string;
            childTableId: string;
            childColumnId: string;
            parentTableId: string;
            parentColumnId: string;
            parentParticipation: 'PARTIAL' | 'FULL';
            childParticipation: 'PARTIAL' | 'FULL';
            parentCardinality: 'ONE' | 'MANY';
            childCardinality: 'ONE' | 'MANY';
            relType: string;
          }>;
        }>;
      }>;
    }>;
    projectDrawReturns: Array<{
      id: string;
      projectName: string;
      diagramReturns: Array<{
        id: string;
        pixel_x: number;
        pixel_y: number;
        diagramContent: string;
        tables: Array<{
          id: string;
          tableName: string;
          pos_x: number;
          pos_y: number;
          columns: Array<{
            id: string;
            path: string;
            constraintName: string;
            columnName: string;
            nullable: boolean;
            unique: boolean;
            isKey: 'PRIMARY_KEY' | 'PRIMARY_KEY_AND_FOREIGN_KEY' | 'FOREIGN_KEY' | 'NORMAL';
            dataType: string;
            length: number;
          }>;
          constraints: Array<{
            id: string;
            childTableId: string;
            childColumnId: string;
            parentTableId: string;
            parentColumnId: string;
            parentParticipation: 'PARTIAL' | 'FULL';
            childParticipation: 'PARTIAL' | 'FULL';
            parentCardinality: 'ONE' | 'MANY';
            childCardinality: 'ONE' | 'MANY';
            relType: string;
          }>;
        }>;
      }>;
    }>;
  };
}

export interface PutUpdateTableRequest {
  tableId: string;
  body: {
    schemaId: string;
    tableName: string;
  };
}

export interface PutUpdateTableResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostDiagramTableMappingRequest {
  tableId: string;
  diagramId: string;
  body: {
    posX: number;
    posY: number;
  };
}

export interface PostDiagramTableMappingResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteDiagramTableMappingRequest {
  tableId: string;
  diagramId: string;
}

export interface DeleteDiagramTableMappingResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostAddTableRequest {
  schemaId: string;
  tableName: string;
}

export interface PostAddTableResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteTableRequest {
  tableId: string;
}

export interface DeleteTableResponse {
  status: string;
  data: object;
  message: string;
}

export interface PutUpdateSchemaRequest {
  schemaId: string;
  body: {
    projectId: string;
    schemaName: string;
  };
}

export interface PutUpdateSchemaResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostAddSchemaRequest {
  projectId: string;
  schemaName: string;
}

export interface PostAddSchemaResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteSchemaRequest {
  schemaId: string;
}

export interface DeleteSchemaResponse {
  status: string;
  data: object;
  message: string;
}

export interface PutUpdateDiagramRequest {
  diagramId: string;
  body: {
    projectId: string;
    diagramName: string;
    diagramContent: string;
    sizeX: number;
    sizeY: number;
  };
}

export interface PutUpdateDiagramResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostAddDiagramRequest {
  projectId: string;
  diagramName: string;
  diagramContent: string;
  sizeX: number;
  sizeY: number;
}

export interface PostAddDiagramResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteDiagramRequest {
  diagramId: string;
}

export interface DeleteDiagramResponse {
  status: string;
  data: object;
  message: string;
}

export interface PutUpdateConstraintRequest {
  constraintId: string;
  body: {
    parentTableId: string;
    parentColumnId: string;
    childTableId: string;
    childColumnId: string;
    parentParticipation: string;
    childParticipation: string;
    parentCardinality: string;
    childCardinality: string;
    relType: string;
  };
}

export interface PutUpdateConstraintResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostConstraintRequest {
  childTableId: string;
  childColumnId: string;
  parentTableId: string;
  parentColumnId: string;
  parentParticipation: string;
  childParticipation: string;
  parentCardinality: string;
  childCardinality: string;
  relType: string;
}

export interface PostConstraintResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteConstraintRequest {
  constraintId: string;
}

export interface DeleteConstraintResponse {
  status: string;
  data: object;
  message: string;
}

export interface PutUpdateColumnRequest {
  columnId: string;
  body: {
    tableId: string;
    path: string;
    constraintName: string;
    columnName: string;
    nullable: boolean;
    unique: boolean;
    isKey: 'PRIMARY_KEY' | 'PRIMARY_KEY_AND_FOREIGN_KEY' | 'FOREIGN_KEY' | 'NORMAL';
    dataType: string;
    length: number;
  };
}

export interface PutUpdateColumnResponse {
  status: string;
  data: object;
  message: string;
}

export interface PostColumnRequest {
  tableId: string;
  path: string;
  constraintName: string;
  columnName: string;
  nullable: boolean;
  unique: boolean;
  isKey: 'PRIMARY_KEY' | 'PRIMARY_KEY_AND_FOREIGN_KEY' | 'FOREIGN_KEY' | 'NORMAL';
  dataType: string;
  length: number;
}

export interface PostColumnResponse {
  status: string;
  data: string;
  message: string;
}

export interface DeleteColumnRequest {
  columnId: string;
}

export interface DeleteColumnResponse {
  status: string;
  data: object;
  message: string;
}
