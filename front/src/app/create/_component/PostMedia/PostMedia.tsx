import { useEffect, useState } from "react";
import { Icon } from "@/components";
import { Paint, Video, Music } from "@/components/media";
import createContentStore from "@/stores/create-content";
import styles from "./PostMedia.module.scss";

export default function PostMedia() {
  const useContentStore = createContentStore();
  const [preview, sePreview] = useState<string>("");
  type MediaType = "PAINT" | "MUSIC" | "VIDEO";
  const type = useContentStore.type as MediaType;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      useContentStore.setFile(selectedFile);
      previewFile(selectedFile);
    }
  };
  // navigator.mediaDevices.getUserMedia();

  const previewFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      if (typeof reader.result === "string") {
        sePreview(reader.result);
      }
    };
  };

  const categories: { [key in MediaType]: string[] } = {
    PAINT: ["그림", "image/"],
    VIDEO: ["영상", "video/"],
    MUSIC: ["음악", "audio/"],
  };

  useEffect(() => {
    useContentStore.cleanFile();
  }, [type]);

  return (
    <main className={styles.container}>
      {useContentStore.file && preview ? (
        <div className={styles["preview-container"]}>
          <div className={styles["another-select"]}>
            <label htmlFor="fileinput">
              <p>다른 {categories[type][0]} 선택하기</p>
              <Icon iconName="addFile" size={17} />
            </label>
            <input
              className={styles.input}
              type="file"
              accept={`${categories[type][1]}*`}
              name="fileinput"
              id="fileinput"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles["preview-wrapper"]}>
            {type === "PAINT" && <Paint dataUrl={preview} />}
            {type === "VIDEO" && <Video dataUrl={preview} />}
            {type === "MUSIC" && <Music dataUrl={preview} />}
          </div>
        </div>
      ) : (
        <>
          <label className={styles.upload} htmlFor="fileinput">
            <Icon iconName="addFile" size={50} />
            <p>{categories[type][0]}을 업로드 해주세요</p>
          </label>
          <input
            className={styles.input}
            type="file"
            accept={`${categories[type][1]}*`}
            name="fileinput"
            id="fileinput"
            onChange={handleFileChange}
          />
        </>
      )}
    </main>
  );
}
