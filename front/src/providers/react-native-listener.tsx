"use client";
import createContentStore from "@/stores/create-content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function RNListener({ children }: AppProviderProps) {
  const useContentStore = createContentStore();
  const router = useRouter();
  /** react native 환경에서만 가능 */
  const listener = (e: MessageEventInit) => {
    const data = JSON.parse(e.data);
    const type = data.type;

    switch (type) {
      case "Upload paint":
        useContentStore.setPaint(data.data);
        break;
      case "Upload video":
        useContentStore.setVideo(data.data);
        alert(data.data);
        break;
      case "router":
        router.push(data.path);
        break;
      default:
        break;
    }

    // const path = e.data.data;
    // console.log(e.data.data);
    // alert(e.data);
    // router.push(path);
  };
  useEffect(() => {
    // /** android */
    // document.addEventListener("message", listener);
    // /** ios */
    // window.addEventListener("message", listener);
    if (window.ReactNativeWebView) {
      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    }
  }, []);

  return <>{children}</>;
}
