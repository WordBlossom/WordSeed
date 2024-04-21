import { ListenerProps } from "../types";

export const addListener = ({
  activeContentRef,
  activeInterfaceRef,
  touchContent,
  touchInterface,
}: ListenerProps) => {
  activeContentRef.current?.addEventListener("touchstart", touchContent, {
    passive: true,
  });
  activeContentRef.current?.addEventListener("touchmove", touchContent, {
    passive: true,
  });
  activeInterfaceRef.current?.addEventListener("touchstart", touchInterface, {
    passive: true,
  });
  activeInterfaceRef.current?.addEventListener("touchmove", touchInterface, {
    passive: true,
  });
  activeInterfaceRef.current?.addEventListener("touchend", touchInterface, {
    passive: true,
  });
};
export const removeListener = ({
  activeContentRef,
  activeInterfaceRef,
  touchContent,
  touchInterface,
}: ListenerProps) => {
  activeContentRef.current?.removeEventListener("touchstart", touchContent);
  activeContentRef.current?.removeEventListener("touchmove", touchContent);
  activeInterfaceRef.current?.removeEventListener("touchstart", touchInterface);
  activeInterfaceRef.current?.removeEventListener("touchmove", touchInterface);
  activeInterfaceRef.current?.removeEventListener("touchend", touchInterface);
};
