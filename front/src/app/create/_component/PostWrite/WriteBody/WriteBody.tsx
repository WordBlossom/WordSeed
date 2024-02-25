import createContentStore from "@/stores/create-content";
import styles from "./WriteBody.module.scss";

export default function WriteBody() {
  const useContentStore = createContentStore();

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useContentStore.setTextContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={`${styles.textarea} ${styles[useContentStore.textAlign]}`}
        placeholder="여기에 글을 써주세요"
        value={useContentStore.textContent}
        onChange={textChange}
      />
    </div>
  );
}
