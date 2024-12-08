import { useEffect, useState } from 'react';

import { styles } from './ProjectList.styles';

import { ProjectItem } from '@/components/home/project-item';
import { useAuthStore } from '@/features/auth';
import { getProjectList } from '@/features/erd-project/erd-project.api';
import type { Project } from '@/features/erd-project/erd-project.dto';

export function ProjectList() {
  const { accessToken } = useAuthStore();

  const [projectList, setProjectList] = useState<Project[]>([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (accessToken) {
      getProjectList()
        .then((res) => {
          setProjectList(res.data);
        })
        .catch(() => {
          setProjectList([]);
        });
    }
  }, [accessToken]);

  return (
    <styles.container>
      <styles.searchOptions>
        <styles.searchTextInput
          placeholder='프로젝트 이름이나 설명을 입력해주세요.'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <styles.button>정렬</styles.button>
        <styles.button>새 프로젝트</styles.button>
      </styles.searchOptions>
      {projectList.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </styles.container>
  );
}
