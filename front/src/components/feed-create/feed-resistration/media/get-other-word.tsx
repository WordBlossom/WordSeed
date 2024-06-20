import { Icon } from "@/components";
import styles from "./PostMedia.module.scss";

type GetOtherWorkProps = {
  typeDesc: string;
  typeContent: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GetOtherWork({
  typeDesc,
  typeContent,
  handleFileChange,
}: GetOtherWorkProps) {
  return (
    <div className={styles["another-select"]}>
      <label htmlFor="fileinput">
        <p>다른 {typeDesc} 선택하기</p>
        <Icon iconName="addFile" size={17} />
      </label>
      <input
        className={styles.input}
        type="file"
        accept={`${typeContent}*`}
        name="fileinput"
        id="fileinput"
        onChange={handleFileChange}
      />
    </div>
  );
}
