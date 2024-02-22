import styles from "./WriteBody.module.scss";

export default function WriteBody() {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="여기에 글을 써주세요"
      />
    </div>
  );
}
