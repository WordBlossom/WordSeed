import { Icon } from "@/components";
import styles from "./PostMedia.module.scss";

type GetWorkProps = {
  typeDesc: string;
  typeContent: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GetWork({
  typeDesc,
  typeContent,
  handleFileChange,
}: GetWorkProps) {
  return (
    <>
      <label className={styles.upload} htmlFor="fileinput">
        <Icon iconName="addFile" size={50} />
        <p>{typeDesc}을 업로드 해주세요</p>
      </label>
      <input
        className={styles.input}
        type="file"
        accept={`${typeContent}*`}
        name="fileinput"
        id="fileinput"
        onChange={handleFileChange}
      />
    </>
  );
}
