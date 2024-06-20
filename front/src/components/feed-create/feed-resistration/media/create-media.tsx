"use client";

import { useEffect } from "react";
import createContentStore from "@/stores/create-content";
import GetWork from "./get-work";
import GetOtherWork from "./get-other-word";
import MediaPreview from "./media-preview";
import styles from "./PostMedia.module.scss";

type MediaType = "PAINT" | "MUSIC" | "VIDEO";

const categories: { [key in MediaType]: string[] } = {
  PAINT: ["그림", "image/"],
  VIDEO: ["영상", "video/"],
  MUSIC: ["음악", "audio/"],
};

export default function CreateMedia() {
  const { previewUrl, type, setFile, cleanFile } = createContentStore();
  const [typeDesc, typeContent] = categories[type as MediaType];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files ? e.target.files[0] : null;
    if (selectedFile) setFile(selectedFile);
  };
  // navigator.mediaDevices.getUserMedia();

  useEffect(() => {
    cleanFile();
  }, [type]);

  return (
    <main className={styles.container}>
      {previewUrl ? (
        <div className={styles["preview-container"]}>
          <GetOtherWork
            typeDesc={typeDesc}
            typeContent={typeContent}
            handleFileChange={handleFileChange}
          />
          <MediaPreview preview={previewUrl} />
        </div>
      ) : (
        <GetWork
          typeDesc={typeDesc}
          typeContent={typeContent}
          handleFileChange={handleFileChange}
        />
      )}
    </main>
  );
}
