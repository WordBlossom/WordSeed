"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import { FeedContent, FeedInterface, Comment } from "@/components";
import NoData from "./noData";
import { FeedListData, FeedListFetchNextPage } from "./types";
import { addListener, removeListener } from "./utils/listener-util";
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
  const touchStartY = useRef<number | null>(null);
  const hasListenerFirstSlide = useRef<boolean>(false);
  const [activeContentIdx, setActiveContentIdx] = useState<number | null>(null);

  const activeContentRef = useRef<HTMLDivElement>(null);
  const activeInterfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiper && !swiper.destroyed && activeContentRef.current) {
      if (swiper.previousIndex !== undefined) {
        const prevIndex = swiper.previousIndex;
        const prevSlide = swiper.slides[prevIndex];
        const prevContent = prevSlide.firstChild;
        prevContent.scrollTop = 0;
      }

      const touchInterface = (e: React.TouchEvent) => {
        // 터치 시작 y좌표 저장
        if (e.type === "touchstart") {
          touchStartY.current = e.touches[0].clientY;
          return;
        }

        // 터치가 끝났을 때, 시작점 좌표와 비교해서 방향을 계산 후 슬라이드 이동
        if (e.type === "touchend" && touchStartY.current) {
          const touchEndY = e.changedTouches[0].clientY;
          const scrollUp = touchStartY.current - touchEndY;
          // 아이콘 터치할 수 있을 정도의 움직임은 무시
          if (Math.abs(scrollUp) <= 5) return;

          // 이동 전에 이벤트 리스터 모두 제거
          removeListener({
            activeContentRef,
            activeInterfaceRef,
            touchContent,
            touchInterface,
          });

          swiper.allowTouchMove = true;
          if (scrollUp < -5) swiper.slidePrev(300);
          else if (scrollUp > 5) swiper.slideNext(300);
        }
      };

      const touchContent = (e: React.TouchEvent) => {
        if (!activeContentRef.current) return;
        const activeContent = activeContentRef.current;
        // 현재 content 스크롤 가능한 높이
        const diff = activeContent.scrollHeight - activeContent.clientHeight;
        // touchStart 이벤트면 터치한 y좌표를 useRef에 저장
        if (e.type === "touchstart") {
          touchStartY.current = e.touches[0].clientY;
          return;
        }

        if (e.type === "touchend" && touchStartY.current) {
          const touchEndY = e.changedTouches[0].clientY;
          const scrollUp = touchStartY.current - touchEndY < 0;
          if (activeContentIdx === 0 && scrollUp) {
            swiper.allowTouchMove = false;
            addListener({
              activeContentRef,
              activeInterfaceRef,
              touchContent,
              touchInterface,
            });
          }
          return;
        }

        // touchMove 이벤트면 현재 touch의 y좌표를 추적하고
        if (e.type === "touchmove" && touchStartY.current) {
          const touchMoveY = e.changedTouches[0].clientY;

          // 이를 터치 시작 y좌표와 비교해서 스크롤을 어디로 했는지 확인
          const scrollUp = touchStartY.current - touchMoveY < 0;
          const scrollTop = activeContent.scrollTop;
          // 만약 스크롤을 위로 올리는 상황 & 현재 스크롤의 위치가 최상단 이상이면
          if (scrollUp && scrollTop <= 0) {
            // 슬라이드를 위한 터치 감지를 켠다
            swiper.allowTouchMove = true;
            // 이벤트 리스너를 지운다
            removeListener({
              activeContentRef,
              activeInterfaceRef,
              touchContent,
              touchInterface,
            });
            return;
          }
          // 스크롤을 아래로 내리는 상황
          if (!scrollUp && scrollTop >= diff) {
            swiper.allowTouchMove = true;
            removeListener({
              activeContentRef,
              activeInterfaceRef,
              touchContent,
              touchInterface,
            });
            return;
          }
        }
      };
      swiper.allowTouchMove = false;
      if (data?.pages.length !== 1) {
        addListener({
          activeContentRef,
          activeInterfaceRef,
          touchContent,
          touchInterface,
        });
      }
      if (activeContentIdx === 0 && !hasListenerFirstSlide.current) {
        const activeSlide = swiper.slides[activeContentIdx];
        const activeContent = activeSlide.firstChild;
        activeContent.addEventListener("touchend", touchContent, {
          passive: true,
        });
        hasListenerFirstSlide.current = true;
      }
    }
  });

  return (
    <>
      {!data?.pages.length && <NoData />}
      {!!data?.pages.length && (
        <Swiper
          // key를 설정하면 key가 달라질 때 이 컴포넌트가 새롭게 생성됨
          // 따라서 swiperKey으로 key를 설정해서 swiperKey이 달라질 때만 컴포넌트를 새롭게 생성하고
          // 데이터가 추가되는 경우는 유지하도록 함
          key={swiperKey}
          className={`${style["swiper-container"]}`}
          direction={"vertical"}
          onInit={(swiper) => {
            setSwiper(swiper);
            setActiveContentIdx(swiper.activeIndex);
          }}
          onTransitionStart={(swiper) =>
            setActiveContentIdx(swiper.activeIndex)
          }
          preventInteractionOnTransition={true}
          longSwipesRatio={0.05}
          onReachEnd={() => {
            if (data?.pages.length === 1) return;
            fetchNextPage();
          }}
        >
          {data?.pages.map((feedData, idx) => (
            <SwiperSlide key={idx} className={style["swiper-card"]}>
              <FeedContent
                activeContentRef={activeContentRef}
                feedData={feedData}
              />
              <FeedInterface
                activeInterfaceRef={activeInterfaceRef}
                feedData={feedData}
              />
            </SwiperSlide>
          ))}
          {commentToggle && <Comment />}
        </Swiper>
      )}
    </>
  );
}
