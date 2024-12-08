import { styles } from './ProjectItem.styles';

interface ProjectItemProps {
  project: {
    id: string;
    projectName: string;
  };
  onClick: () => void;
}

export function ProjectItem({ project, onClick }: ProjectItemProps) {
  return (
    <styles.container onClick={onClick}>
      <styles.projectInformation>
        <styles.projectTitle>{project.projectName}</styles.projectTitle>
        {/* <styles.projectDescription>테스트 설명</styles.projectDescription>
          <styles.projectLastUpdated>2024.10.21</styles.projectLastUpdated> */}
      </styles.projectInformation>
    </styles.container>
  );
}
