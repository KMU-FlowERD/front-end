'use client';

import { useEffect } from 'react';

import { ERDProjectPage } from '@/page';
import { useERDProjectStore } from '@/providers';

export default function ProjectDetails({ params }: { params: { projectId: string } }) {
  const fetchAndSetProject = useERDProjectStore((state) => state.fetchAndSetProject);

  const { projectId } = params;

  useEffect(() => {
    fetchAndSetProject(projectId);
  }, []);

  return <ERDProjectPage />;
}
