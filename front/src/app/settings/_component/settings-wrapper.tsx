import style from "./settings.module.scss";

type SettingsWrapperProps = {
  children: React.ReactNode;
};

export default function SettingsWrapper({ children }: SettingsWrapperProps) {
  return <div className={style["settings-wrapper"]}>{children}</div>;
}
