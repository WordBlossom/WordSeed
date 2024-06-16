"use client";

import { useEffect, useState } from "react";
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
  const { file, type, setFile, cleanFile } = createContentStore();
  const [preview, setPreview] = useState<string>("");
  const [typeDesc, typeContent] = categories[type as MediaType];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      previewFile(selectedFile);
    }
  };
  // navigator.mediaDevices.getUserMedia();

  const previewFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
  };

  useEffect(() => {
    cleanFile();
  }, [type]);

  return (
    <main className={styles.container}>
      {file && preview ? (
        <div className={styles["preview-container"]}>
          <GetOtherWork
            typeDesc={typeDesc}
            typeContent={typeContent}
            handleFileChange={handleFileChange}
          />
          <MediaPreview preview={preview} />
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
