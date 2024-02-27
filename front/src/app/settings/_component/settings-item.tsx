import style from "./settings.module.scss";

type SettingsItemProps = {
  title: string;
  childNode: React.ReactNode;
};

export default function SettingsItem({ title, childNode }: SettingsItemProps) {
  return (
    <div className={style["settings-item"]}>
      <div className={style["settings-title"]}>{title}</div>
      {childNode}
    </div>
  );
}
