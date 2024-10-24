import { ProfileInformation } from './ProfileInformation';
import { styles } from './ProfileSetting.styles';

interface ProfileSettingProps {
  onClickCancel: () => void;
  onClickConfirm: () => void;
}

export function ProfileSetting({
  onClickCancel,
  onClickConfirm,
}: ProfileSettingProps) {
  return (
    <styles.container>
      <styles.profileInformationContainer>
        <styles.profileImageFrame>
          <img
            src='https://s3-alpha-sig.figma.com/img/8017/7146/ede8cb8e4f94e50ebfdf6c3129c38b3a?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DGXgR7aGoHD5FF5iSMyXM8~oaJxtinh3oWLUab6YA1amP10Qz6nymU3iFy8KJGNNpZHDlCFVAshU8Ks5grKCZ3700ghT1VOrR~ZJpxLDEhN6Qlm-Jj9zugQgjqw8BeH~kC4eltR~JUjSeM2jrdyt5RrK5RgP~RoqqD5qcOmEVelyUK3Kuox5iG6Wp1t7RVgOzHTGbc8yUHOmEi9TAzirfmUQULowUxz3SywwrviygI-0CtI0WW5ZEIwFWKkyFoCgi9U8Gd4WUuBb78iz4ziZ5EWEOfDfGPPsVPhHcuQCGLXafgPvjNFx4DVWhA06ha8ngg4nQHrMQ9X8S-mjwjavAQ__'
            alt='profile'
          />
        </styles.profileImageFrame>
        <ProfileInformation />
      </styles.profileInformationContainer>
      <styles.buttons>
        <styles.confirmButton onClick={onClickConfirm}>
          확인
        </styles.confirmButton>
        <styles.cancelButton onClick={onClickCancel}>취소</styles.cancelButton>
      </styles.buttons>
    </styles.container>
  );
}
