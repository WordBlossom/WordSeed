import Link from "next/link";
import styles from "./comment.module.scss";
import Button from "@/components/Button/Button";

export default function CommentItem() {
  const handleModifyClick = () => {};
  const handleDeleteClick = () => {
    // 댓글 삭제 요청
  };

  return (
    <div className={styles["comment-item"]}>
      <div className={styles["comment-content"]}>
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화
        삼천리 화려 강산 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이
        보전하세 동해물과 백
      </div>
      <div className={styles["comment-item-bottom"]}>
        <Link className={styles["link"]} href={"/profile/1"}>
          - 초아누리
        </Link>
        <Button type="small" content={"삭제"} onClick={handleDeleteClick} />
        {/* <div className={styles["button-wrapper"]}>
        <Button type="small" content={"수정"} onClick={handleModifyClick} />
        </div> */}
      </div>
    </div>
  );
}
