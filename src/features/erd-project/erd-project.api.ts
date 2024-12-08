import axios from 'axios';

import type { GetProjectListResponse } from './erd-project.dto';

export const getProjectList = async () =>
  axios.get<GetProjectListResponse>('/api/get/project/list').then((res) => res.data);
