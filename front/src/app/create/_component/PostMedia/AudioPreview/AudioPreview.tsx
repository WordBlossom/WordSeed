import { Icon } from "@/components";
import styles from "./AudioPreview.module.scss";
import { useRef, useState } from "react";

export default function AudioPreview({ preview }: { preview: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.container}>
      {isPlaying ? (
        <div
          onClick={() => {
            setIsPlaying(false);
            audioRef?.current?.pause();
          }}
        >
          <Icon iconName="audioStop" size={50} />
        </div>
      ) : (
        <div
          onClick={() => {
            setIsPlaying(true);
            audioRef?.current?.play();
          }}
        >
          <Icon iconName="audioPlay" size={50} />
        </div>
      )}
      <audio
        controls
        src={preview}
        ref={audioRef}
        className={styles.audio}
      ></audio>
    </div>
  );
}
