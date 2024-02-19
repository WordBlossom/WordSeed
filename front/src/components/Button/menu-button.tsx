import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { useRef, useEffect } from "react";

export default function MenuButton() {
  const reactNativeWebView = useRef<any>(null);

  useEffect(() => {
    reactNativeWebView.current = window.ReactNativeWebView;
  }, []);

  const onClick = () => {
    // 사이드바 등장
    reactNativeWebView.current.postMessage("Open Sidebar");
  };

  return <Button content={<Icon iconName="menu" />} onClick={onClick} />;
}
