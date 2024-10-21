import { styles } from './ProjectItem.styles';

export function ProjectItem() {
  return (
    <styles.container>
      <styles.projectInformation>
        <styles.projectTitle>테스트 타이틀</styles.projectTitle>
        <styles.projectDescription>테스트 설명</styles.projectDescription>
        <styles.projectLastUpdated>2024.10.21</styles.projectLastUpdated>
      </styles.projectInformation>
    </styles.container>
  );
}
