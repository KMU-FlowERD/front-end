'use client';

import { useEffect, useState } from 'react';

import { getProjectById } from '@/features/erd-project/erd-project.api';
import type { GetProjectResponse } from '@/features/erd-project/erd-project.dto';
import { ERDProjectPage } from '@/page';

export default function ProjectDetails({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const [project, setProject] = useState<GetProjectResponse['data'] | null>(null);

  useEffect(() => {
    if (projectId) {
      getProjectById({ projectId: projectId as string })
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch project:', err);
        });
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return <ERDProjectPage />;
}
