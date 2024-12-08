export interface Project {
  id: string;
  projectName: string;
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
          isKey: string;
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
