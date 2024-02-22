import { Icon } from "@/components";
import styles from "./WriteOption.module.scss";
import { useState } from "react";

export default function WriteOption() {
  const [textAlign, setTextAlign] = useState<
    "alignLeft" | "alignCenter" | "alignRight"
  >("alignLeft");
  const textCnt = 0;

  const copyHandler = () => {};

  const textAlignHandler = () => {
    switch (textAlign) {
      case "alignLeft":
        setTextAlign("alignCenter");
        break;
      case "alignCenter":
        setTextAlign("alignRight");
        break;
      case "alignRight":
        setTextAlign("alignLeft");
        break;
      default:
        break;
    }
  };

  const saveHandler = () => {
    //어싱크 스토리지 저장
  };

  return (
    <footer className={styles.container}>
      <button onClick={copyHandler}>
        <Icon iconName="copy" />
      </button>
      <button onClick={textAlignHandler}>
        <Icon iconName={textAlign} />
      </button>
      <div>{textCnt} 자</div>
      <button onClick={saveHandler}>임시저장</button>
    </footer>
  );
}
