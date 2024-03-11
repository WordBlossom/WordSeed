"use client";

import React, { MutableRefObject } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { FeedDetail } from "@/api/feed/types";
import style from "./feed.module.scss";

type FeedContentProps = {
  activeContentRef: MutableRefObject<HTMLDivElement | null>;
  feedData: FeedDetail;
};

function FeedContent({ activeContentRef, feedData }: FeedContentProps) {
  const slide = useSwiperSlide();
  return (
    <div
      ref={slide.isActive ? activeContentRef : null}
      className={style["content-container"]}
    >
      <div className={style["content-wrapper"]}>
        <div className={style["content"]}>{feedData.content}</div>
      </div>
    </div>
  );
}

export default React.memo(FeedContent);
