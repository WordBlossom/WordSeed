import style from "./alram.module.scss";

type AlramContainerProps = {
  children: React.ReactNode;
};

export default function AlramContainer({ children }: AlramContainerProps) {
  return <div className={style["alram-container"]}>{children}</div>;
}
