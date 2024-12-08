import axios from 'axios';

import type {
  DeleteColumnRequest,
  DeleteColumnResponse,
  DeleteConstraintRequest,
  DeleteConstraintResponse,
  DeleteDiagramRequest,
  DeleteDiagramResponse,
  DeleteDiagramTableMappingRequest,
  DeleteDiagramTableMappingResponse,
  DeleteSchemaRequest,
  DeleteTableRequest,
  GetProjectAllRequest,
  GetProjectAllResponse,
  GetProjectListResponse,
  GetProjectRequest,
  GetProjectResponse,
  PostAddDiagramRequest,
  PostAddDiagramResponse,
  PostAddProjectRequest,
  PostAddProjectResponse,
  PostAddSchemaRequest,
  PostColumnRequest,
  PostColumnResponse,
  PostConstraintRequest,
  PostConstraintResponse,
  PostDiagramTableMappingRequest,
  PutUpdateColumnRequest,
  PutUpdateColumnResponse,
  PutUpdateConstraintRequest,
  PutUpdateConstraintResponse,
  PutUpdateDiagramRequest,
  PutUpdateDiagramResponse,
  PutUpdateProjectRequest,
  PutUpdateProjectResponse,
  PutUpdateSchemaRequest,
  PutUpdateTableRequest,
  PutUpdateTableResponse,
} from './erd-project.dto';

export const putUpdateProject = (request: PutUpdateProjectRequest) =>
  axios
    .put<PutUpdateProjectResponse>(`/api/update/project/${request.projectId}`, request.body)
    .then((response) => response.data);

export const getProjectList = () => axios.get<GetProjectListResponse>('/api/get/project/list').then((res) => res.data);

export const postAddProject = ({ projectName }: PostAddProjectRequest) =>
  axios.post<PostAddProjectRequest>('/api/add/project', { projectName }).then((response) => response.data);

export const getProjectById = (request: GetProjectRequest) =>
  axios.get<GetProjectResponse>(`/api/get/project/${request.projectId}`).then((response) => response.data);

export const getProjectAll = (request: GetProjectAllRequest) =>
  axios.get<GetProjectAllResponse>(`/api/get/project/all/${request.projectId}`).then((response) => response.data);

export const putUpdateTable = (request: PutUpdateTableRequest) =>
  axios
    .put<PutUpdateTableResponse>(`/api/update/table/${request.tableId}`, request.body)
    .then((response) => response.data);

export const postDiagramTableMapping = (request: PostDiagramTableMappingRequest) =>
  axios
    .post<PostDiagramTableMappingRequest>(`/api/diagramTable/${request.tableId}/${request.diagramId}`, request.body)
    .then((response) => response.data);

export const deleteDiagramTableMapping = (request: DeleteDiagramTableMappingRequest) =>
  axios
    .delete<DeleteDiagramTableMappingResponse>(`/api/diagramTable/${request.tableId}/${request.diagramId}`)
    .then((response) => response.data);

export const postAddTable = (request: PostAddProjectRequest) =>
  axios.post<PostAddProjectResponse>(`/api/add/table`, request).then((response) => response.data);

export const deleteTable = (request: DeleteTableRequest) =>
  axios.delete<DeleteTableRequest>(`/api/delete/table/${request.tableId}`).then((response) => response.data);

export const putUpdateSchema = (request: PutUpdateSchemaRequest) =>
  axios
    .put<PutUpdateSchemaRequest>(`/api/update/schema/${request.schemaId}`, request.body)
    .then((response) => response.data);

export const postAddSchema = (request: PostAddSchemaRequest) =>
  axios.post<PostAddProjectResponse>(`/api/add/schema`, request).then((response) => response.data);

export const deleteSchema = (request: DeleteSchemaRequest) =>
  axios.delete<DeleteSchemaRequest>(`/api/delete/schema/${request.schemaId}`).then((response) => response.data);

export const putUpdateDiagram = (request: PutUpdateDiagramRequest) =>
  axios
    .put<PutUpdateDiagramResponse>(`/api/update/diagram/${request.diagramId}`, request.body)
    .then((response) => response.data);

export const postAddDiagram = (request: PostAddDiagramRequest) =>
  axios.put<PostAddDiagramResponse>(`/api/add/diagram`, request).then((response) => response.data);

export const deleteDiagram = (request: DeleteDiagramRequest) =>
  axios.delete<DeleteDiagramResponse>(`/api/delete/diagram/${request.diagramId}`).then((response) => response.data);

export const putUpdateConstraint = (request: PutUpdateConstraintRequest) =>
  axios
    .put<PutUpdateConstraintResponse>(`/api/update/constraint/${request.constraintId}`, request.body)
    .then((response) => response.data);

export const postConstraint = (request: PostConstraintRequest) =>
  axios.post<PostConstraintResponse>('/api/add/constraints', request).then((response) => response.data);

export const deleteConstraint = (request: DeleteConstraintRequest) =>
  axios
    .delete<DeleteConstraintResponse>(`/api/delete/constraints/${request.constraintId}`)
    .then((response) => response.data);

export const putUpdateColumn = (request: PutUpdateColumnRequest) =>
  axios
    .put<PutUpdateColumnResponse>(`/api/update/column/${request.columnId}`, request.body)
    .then((response) => response.data);

export const postAddColumn = (request: PostColumnRequest) =>
  axios.post<PostColumnResponse>('/api/add/column', request).then((response) => response.data);

export const deleteColumn = (request: DeleteColumnRequest) =>
  axios.delete<DeleteColumnResponse>(`/api/delete/column/${request.columnId}`).then((response) => response.data);
