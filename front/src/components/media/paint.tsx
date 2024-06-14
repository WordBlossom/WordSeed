import Image from "next/image";
import styles from "./media.module.scss";

export function Paint({ dataUrl }: { dataUrl: string }) {
  return (
    <div className={`${styles["image-wrapper"]} ${styles["shadow"]}`}>
      <Image src={dataUrl} alt="dataUrl" priority fill />
    </div>
  );
}