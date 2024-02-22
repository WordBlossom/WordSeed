import { Icon } from "@/components";
import styles from "./PostMedia.module.scss";
import createContentStore from "@/stores/create-content";

export default function PostMedia() {
  const useContentStore = createContentStore();

  return (
    <main className={styles.container}>
      {useContentStore.mediaFile ? (
        ""
      ) : (
        <button className={styles.upload}>
          <Icon iconName="addFile" size={50} />
          <p>음악을 업로드 해주세요</p>
        </button>
      )}
    </main>
  );
}
