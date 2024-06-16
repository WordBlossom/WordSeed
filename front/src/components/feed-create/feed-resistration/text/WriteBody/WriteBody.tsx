import createContentStore from "@/stores/create-content";
import { PostAlign } from "@/api/feed/types";
import styles from "./WriteBody.module.scss";

export default function WriteBody() {
  const { textContent, textAlign, setTextContent } = createContentStore();
  const iconNames: { [key in PostAlign]: string } = {
    LEFT: "alignLeft",
    CENTER: "alignCenter",
    RIGHT: "alignRight",
  };

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={`${styles.textarea} ${styles[iconNames[textAlign]]}`}
        placeholder="여기에 글을 써주세요"
        value={textContent}
        onChange={textChange}
      />
    </div>
  );
}
