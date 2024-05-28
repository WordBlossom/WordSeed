import { Icon } from "@/components";
import styles from "./WriteOption.module.scss";
import createContentStore from "@/stores/create-content";
import { IconType } from "@/components/Icon/Icon";
import { PostAlign } from "@/api/feed/types";

export default function WriteOption() {
  const { textAlign, textContent, setTextAlign } = createContentStore();
  const iconNames: { [key in PostAlign]: IconType } = {
    LEFT: "alignLeft",
    CENTER: "alignCenter",
    RIGHT: "alignRight",
  };
  const copyHandler = () => {};

  const textAlignHandler = () => {
    switch (textAlign) {
      case "LEFT":
        setTextAlign("CENTER");
        break;
      case "CENTER":
        setTextAlign("RIGHT");
        break;
      case "RIGHT":
        setTextAlign("LEFT");
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
        <Icon iconName={iconNames[textAlign]} />
      </button>
      <div>{textContent.length} 자</div>
      <button onClick={saveHandler}>임시저장</button>
    </footer>
  );
}
