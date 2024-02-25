import style from "./user-info.module.scss";

type InfoWrapperProps = {
  children: React.ReactNode;
};

export default function InfoWrapper({ children }: InfoWrapperProps) {
  return <div className={style["info-wrapper"]}>{children}</div>;
}
