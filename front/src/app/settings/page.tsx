import SettingsWrapper from "./_component/settings-wrapper";
import SettingsItem from "./_component/settings-item";
import {
  UserInfoNode,
  FontSizeNode,
  ThemeNode,
  AlramSettingNode,
  LogOutButton,
} from "./_component/child-nodes";

export default function Settings() {
  return (
    <SettingsWrapper>
      <SettingsItem title={"개인정보수정"} childNode={<UserInfoNode />} />
      {/* <SettingsItem title={"글자 크기"} childNode={<FontSizeNode />} />
      <SettingsItem title={"테마"} childNode={<ThemeNode />} />
      <SettingsItem title={"알림 설정"} childNode={<AlramSettingNode />} /> */}
      {/* <LogOutButton /> */}
    </SettingsWrapper>
  );
}
