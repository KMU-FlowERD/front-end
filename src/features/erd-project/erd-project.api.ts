import axios from 'axios';

import type {
  GetProjectListResponse,
  PostAddProjectRequest,
  GetProjectRequest,
  GetProjectResponse,
} from './erd-project.dto';

export const getProjectList = () => axios.get<GetProjectListResponse>('/api/get/project/list').then((res) => res.data);

export const postAddProject = ({ projectName }: PostAddProjectRequest) =>
  axios.post<PostAddProjectRequest>('/api/add/project', { projectName });

export const getProjectById = (request: GetProjectRequest) =>
  axios.get<GetProjectResponse>(`/api/get/project/${request.projectId}`).then((response) => response.data);
