import styles from "./media.module.scss";

export function Video({ dataUrl }: { dataUrl: string }) {
  return (
    <div className={styles.media}>
      <video src={dataUrl} controls autoPlay muted playsInline></video>
    </div>
  );
}
