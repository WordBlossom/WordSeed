"use client";
import { useRouter } from "next/navigation";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function RNListener({ children }: AppProviderProps) {
  const router = useRouter();
  /** react native 환경에서만 가능 */
  const listener = (e: MessageEventInit) => {
    const path = e.data.data;
    router.push(path);
  };
  if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener("message", listener);
    /** ios */
    window.addEventListener("message", listener);
  }
  return <>{children}</>;
}
