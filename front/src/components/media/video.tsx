import styles from "./media.module.scss";

export function Video({ dataUrl }: { dataUrl: string }) {
  return (
    <div className={`${styles["video-wrapper"]} ${styles["shadow"]}`}>
      <video src={dataUrl} controls autoPlay muted playsInline></video>
    </div>
  );
}
