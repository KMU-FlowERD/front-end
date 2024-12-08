import { styles } from './ProjectItem.styles';

interface ProjectItemProps {
  project: {
    id: string;
    projectName: string;
  };
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <styles.container>
      <styles.projectInformation>
        <styles.projectTitle>{project.projectName}</styles.projectTitle>
        {/* <styles.projectDescription>테스트 설명</styles.projectDescription>
        <styles.projectLastUpdated>2024.10.21</styles.projectLastUpdated> */}
      </styles.projectInformation>
    </styles.container>
  );
}
