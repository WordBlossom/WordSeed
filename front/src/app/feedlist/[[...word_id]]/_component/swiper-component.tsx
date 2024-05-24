"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Virtual } from "swiper/modules";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import { FeedContent, FeedInterface, Comment } from "@/components";
import NoData from "./noData";
import { FeedListData, FeedListFetchNextPage } from "./types";
import {
  handleTouchContent,
  handleTouchInterface,
  addListener,
} from "./utils/listener-util";

import "swiper/css";
import "swiper/css/virtual";
import style from "./feedlist.module.scss";

type SwiperComponentProps = {
  swiperKey: string;
  data: FeedListData;
  fetchNextPage: FeedListFetchNextPage;
};

export default function SwiperComponent({
  swiperKey,
  data,
  fetchNextPage,
}: SwiperComponentProps) {
  const [swiper, setSwiper] = useState<any>(null);
  const { commentToggle } = useCommentToggleStateStore();
  const [activeContentIdx, setActiveContentIdx] = useState<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [hasFirstSlideListener, setHasFirstSlideListener] =
    useState<boolean>(false);
  const [hasSecondSlideListener, setHasSecondSlideListener] =
    useState<boolean>(false);

  const SwiperOpts: SwiperProps = {
    modules: [Virtual],
    virtual: true,
    direction: "vertical",
    longSwipesRatio: 0.05,
    preventInteractionOnTransition: true,
    lazyPreloadPrevNext: 1,
    onInit: (swiper) => {
      setSwiper(swiper);
      setActiveContentIdx(swiper.activeIndex);
    },
    onTransitionEnd: (swiper) => setActiveContentIdx(swiper.activeIndex),
    onActiveIndexChange: (swiper) => {
      swiper.slides.forEach((slide) => {
        if (!slide.firstChild) return;
        const contentDiv = slide.firstChild as HTMLElement;
        contentDiv.scrollTop = 0;
      });
    },
    onReachEnd: () => {
      if (data?.pages.length === 1) return;
      fetchNextPage();
    },
  };

  // swiperKey가 달라져서 새로운 swiper가 생성되어
  // 새롭게 리스너를 장착해야 하는 경우
  //  첫번째와 두번째 가상 슬라이드의 리스너 장착 여부를 false로 설정
  useEffect(() => {
    if (swiper && hasFirstSlideListener) {
      setHasFirstSlideListener(false);
      setHasSecondSlideListener(false);
    }
  }, [swiperKey]);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      // 첫번째나 두번째 가상 슬라이드에 리스너가 장착되어 있지 않은 경우
      if (
        (activeContentIdx === 0 && !hasFirstSlideListener) ||
        (activeContentIdx === 1 && !hasSecondSlideListener)
      ) {
        // 현재 보여지는 슬라이드
        const activeSlide = swiper.visibleSlides[0];
        const [activeContent, activeInterface] = activeSlide.children;
        // 리스너 장착
        addListener({
          swiper,
          touchStartY,
          activeContent,
          activeInterface,
          handleTouchContent,
          handleTouchInterface,
        });
        // 해당 슬라이드 리스너 장착 여부 true로 설정
        activeContentIdx === 0
          ? setHasFirstSlideListener(true)
          : setHasSecondSlideListener(true);
      }
    }
    // activeIndex와 리스너 장착 여부를 감지
  }, [activeContentIdx, hasFirstSlideListener, hasSecondSlideListener]);

  return (
    <>
      {!data?.pages.length && <NoData />}
      {!!data?.pages.length && (
        // key를 설정하면 key가 달라질 때 이 컴포넌트가 새롭게 생성됨
        // 따라서 swiperKey으로 key를 설정해서 swiperKey이 달라질 때만 컴포넌트를 새롭게 생성하고
        // 데이터가 추가되는 경우는 유지하도록 함
        <>
          <Swiper
            key={swiperKey}
            className={`${style["swiper-container"]}`}
            {...SwiperOpts}
          >
            {data?.pages.map((feedData, idx) => (
              <SwiperSlide
                key={idx}
                virtualIndex={idx}
                className={style["swiper-card"]}
              >
                <>
                  <FeedContent feedData={feedData} />
                  <FeedInterface feedData={feedData} />
                </>
              </SwiperSlide>
            ))}
          </Swiper>
          {commentToggle && <Comment />}
        </>
      )}
    </>
  );
}
