"use client";
import styles from "./ToggleButton.module.scss";
import { Button } from "..";
import profileToggleStore from "@/stores/profile-toggle";

interface CategoryButtonProps {
  type?: "default" | "wide";
  toggleA: string;
  toggleB: string;
}

export default function ToggleButton({
  type = "default",
  toggleA,
  toggleB,
}: CategoryButtonProps) {
  const selected = profileToggleStore((state) => state.selected);
  const setSelected = profileToggleStore((state) => state.setSelected);

  return (
    <>
      <div className={styles.container}>
        <Button
          type={type}
          content={toggleA}
          onClick={() => setSelected(false)}
          isActive={!selected}
        />
        <Button
          type={type}
          content={toggleB}
          onClick={() => setSelected(true)}
          isActive={selected}
        />
      </div>
    </>
  );
}
