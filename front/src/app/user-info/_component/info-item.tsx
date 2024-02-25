"use client";

import { useLayoutEffect, useRef } from "react";
import useUserInfoClassification from "../hooks/user-info-classification";
import style from "./user-info.module.scss";

type InfoItemProps = {
  title: "작가명" | "소개";
};

export default function InfoItem({ title }: InfoItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent, placeholder] = useUserInfoClassification(title);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    handleResizeHeight();
  };

  const handleResizeHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  useLayoutEffect(() => {
    handleResizeHeight();
  }, []);

  return (
    <div className={style["info-item"]}>
      <div>
        <p className={style["title"]}>{title}</p>
      </div>
      <div className={style["content"]}>
        <textarea
          rows={1}
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  );
}
