"use client";

import MenuButton from "@/components/Button/menu-button";
import styles from "../navbar.module.scss";

type IncludeMenuProp = {
  children: React.ReactNode;
};

export default function IncludeMenu({ children }: IncludeMenuProp) {
  return (
    <div className={styles.navbar}>
      <MenuButton />
      {children}
    </div>
  );
}
