import style from "./alram.module.scss";

type AlramWrapperProps = {
  children: React.ReactNode;
};

export default function AlramWrapper({ children }: AlramWrapperProps) {
  return <div className={style["alram-wrapper"]}>{children}</div>;
}
