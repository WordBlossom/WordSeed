import createContentStore from "@/stores/create-content";
import { Paint, Video, Music } from "@/components/media";
import styles from "./PostMedia.module.scss";

type MediaPreviewProps = {
  preview: string;
};

export default function MediaPreview({ preview }: MediaPreviewProps) {
  const type = createContentStore().type;

  return (
    <div className={styles["preview-wrapper"]}>
      {type === "PAINT" && <Paint dataUrl={preview} />}
      {type === "VIDEO" && <Video dataUrl={preview} />}
      {type === "MUSIC" && <Music dataUrl={preview} />}
    </div>
  );
}
