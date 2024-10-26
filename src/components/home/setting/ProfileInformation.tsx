import { styles } from './ProfileSetting.styles';

export function ProfileInformation() {
  return (
    <styles.profileInformationContainer>
      <styles.profileInformation>
        <styles.profileName>John Doe</styles.profileName>
        <styles.profileDescription>
          Frontend Developer
        </styles.profileDescription>
      </styles.profileInformation>
    </styles.profileInformationContainer>
  );
}
