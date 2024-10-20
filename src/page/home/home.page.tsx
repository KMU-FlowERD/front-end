'use client';

import { styles } from './home.page.styles';

import { Sidebar } from '@/components/home';

export function HomePage() {
  return (
    <styles.container>
      <Sidebar />
    </styles.container>
  );
}
