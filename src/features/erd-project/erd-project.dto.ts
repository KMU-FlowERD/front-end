export interface Project {
  id: string;
  projectName: string;
}

export interface GetProjectListResponse {
  status: string;
  data: Project[];
  message: string;
}
