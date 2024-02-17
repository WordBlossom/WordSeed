import styles from "./ContentCard.module.scss";
import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

export default function ContentCard({
  postId,
  type,
  title,
  content,
  textAlign,
  userName,
  url,
}: ContentCardProps) {
  const contentClassName = `${styles.content} ${styles[textAlign]}`;

  return (
    <Link className={styles.link} href={`/feed/${postId}`}>
      {type === "text" ? (
        <main className={styles.container}>
          <div className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <p className={contentClassName}>{content}</p>
            <p className={styles.artist}>{userName}</p>
          </div>
        </main>
      ) : (
        <main className={styles.media}>
          {type === "img" && <Image src={url} alt="12" fill />}
          {type === "video" && <iframe src={url} width={"100%"} />}
          {type === "sound" && <audio src={url} controls />}
        </main>
      )}
    </Link>
  );
}
