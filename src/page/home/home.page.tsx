'use client';

import { styles } from './home.page.styles';

import { Sidebar } from '@/components/home';
import { ProjectList } from '@/components/home/project-list';

export function HomePage() {
  return (
    <styles.container>
      <Sidebar />
      <ProjectList />
    </styles.container>
  );
}
