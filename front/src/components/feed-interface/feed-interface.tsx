"use client";

import React, { MutableRefObject } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import FeedInterfaceTop from "./feed-interface-top";
import FeedInterfaceBottom from "./feed-interface-bottom";
import { FeedDetail } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type FeedInterfaceProps = {
  activeInterfaceRef?: MutableRefObject<HTMLDivElement | null>;
  feedData: FeedDetail;
  type?: "detail" | "profile";
};
function FeedInterface({
  activeInterfaceRef,
  feedData,
  type,
}: FeedInterfaceProps) {
  const slide = useSwiperSlide();
  return (
    <div
      ref={activeInterfaceRef && slide.isActive ? activeInterfaceRef : null}
      className={styles["feed-interface-container"]}
    >
      <FeedInterfaceTop createdAt={feedData.createdAt} />
      <FeedInterfaceBottom feedData={feedData} type={type} />
    </div>
  );
}

export default React.memo(FeedInterface);
