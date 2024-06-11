import Image from "next/image";
import styles from "./media.module.scss";

export function Paint({ dataUrl }: { dataUrl: string }) {
  return (
    <div className={styles.media}>
      <Image src={dataUrl} alt="dataUrl" priority={true} fill />
    </div>
  );
}
