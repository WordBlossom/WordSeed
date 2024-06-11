import styles from "./media.module.scss";

export function Music({ dataUrl }: { dataUrl: string }) {
  return (
    <div className={styles.media}>
      <audio controls src={dataUrl}></audio>
    </div>
  );
}
