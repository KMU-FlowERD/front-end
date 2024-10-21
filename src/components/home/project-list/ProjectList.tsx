import { useState } from 'react';

import { styles } from './ProjectList.styles';

import { ProjectItem } from '@/components/home/project-item';

export function ProjectList() {
  const [searchText, setSearchText] = useState('');

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
      <ProjectItem />
    </styles.container>
  );
}
