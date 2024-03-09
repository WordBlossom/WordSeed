"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useUserInfoClassification from "../hooks/user-info-classification";
import style from "./user-info.module.scss";
import { useQuery } from "@tanstack/react-query";
import { userInfoQuery } from "@/api/user";

type InfoItemProps = {
  title: "작가명" | "소개";
};

enum InfoItemEnum {
  작가명 = "userName",
  소개 = "userDecp",
}

export default function InfoItem({ title }: InfoItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent, placeholder] = useUserInfoClassification(title);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery(userInfoQuery.myInfo());
  const contentData = isLoading
    ? content
    : data
    ? data[InfoItemEnum[title]]
    : "";

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

  useEffect(() => {
    if (data) {
      setContent(data[InfoItemEnum[title]]);
      setIsLoading(true);
    }
  }, [data, setContent, title]);

  return (
    <div className={style["info-item"]}>
      <div>
        <p className={style["title"]}>{title}</p>
      </div>
      <div className={style["content"]}>
        <textarea
          rows={1}
          ref={textareaRef}
          value={contentData}
          onChange={handleChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  );
}
