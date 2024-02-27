"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FeedInterface, Comment } from "@/components";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import style from "./feedlist.module.scss";

type FeedlistProps = {
  params: { wordseed: string };
};

type ListenerProps = {
  activeContent: HTMLDivElement;
  activeInterface: HTMLDivElement;
  // any... :(
  touchContent: any;
  touchInterface: any;
};

const addListener = ({
  activeContent,
  activeInterface,
  touchContent,
  touchInterface,
}: ListenerProps) => {
  activeContent.addEventListener("touchstart", touchContent);
  activeContent.addEventListener("touchmove", touchContent);
  activeInterface.addEventListener("touchstart", touchInterface);
  activeInterface.addEventListener("touchmove", touchInterface);
  activeInterface.addEventListener("touchend", touchInterface);
};
const removeListener = ({
  activeContent,
  activeInterface,
  touchContent,
  touchInterface,
}: ListenerProps) => {
  activeContent.removeEventListener("touchstart", touchContent);
  activeContent.removeEventListener("touchmove", touchContent);
  activeInterface.removeEventListener("touchstart", touchInterface);
  activeInterface.removeEventListener("touchmove", touchInterface);
  activeInterface.removeEventListener("touchend", touchInterface);
};

export default function Feedlist({ params }: FeedlistProps) {
  // 해당 말씨로 작품 조회
  const wordseed = params.wordseed;

  const swiperRef = useRef<any>(null);
  const touchStartY = useRef<number | null>(null);
  const hasListenerFirstSlide = useRef<boolean>(false);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const { commentToggle } = useCommentToggleStateStore();

  const attatchListener = (swiper: any) => {
    // 이전 content 스크롤 최상단으로 이동
    if (swiper.previousIndex !== undefined) {
      const prevIndex = swiper.previousIndex;
      const prevSlide = swiper.slides[prevIndex];
      const prevContent = prevSlide.firstChild;
      prevContent.scrollTop = 0;
    }

    // 현재 슬라이드의 content와 interface el에 접근
    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    const activeContent = activeSlide.firstChild;
    const activeInterface = activeSlide.lastChild;
    const { scrollHeight, clientHeight } = activeContent;
    // 현재 content 스크롤 가능한 높이
    const diff = scrollHeight - clientHeight;
    // Content에서 스크롤을 하면 작동되는 함수
    const touchContent = (e: React.TouchEvent) => {
      // touchStart 이벤트면 터치한 y좌표를 useRef에 저장
      if (e.type === "touchstart") {
        touchStartY.current = e.touches[0].clientY;
        return;
      }

      //
      if (e.type === "touchend" && touchStartY.current) {
        const touchEndY = e.changedTouches[0].clientY;
        const scrollUp = touchStartY.current - touchEndY < 0;
        if (activeIndex === 0 && scrollUp) {
          swiper.allowTouchMove = false;
          addListener({
            activeContent,
            activeInterface,
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

        // 만약 스크롤을 위로 올리는 상황 & 현재 스크롤의 위치가 최상단 이상이면
        if (scrollUp && activeContent.scrollTop <= 0) {
          // 슬라이드를 위한 터치 감지를 켠다
          swiper.allowTouchMove = true;
          // 이벤트 리스너를 지운다
          removeListener({
            activeContent,
            activeInterface,
            touchContent,
            touchInterface,
          });
          return;
        }
        // 스크롤을 아래로 내리는 상황
        if (!scrollUp && activeContent.scrollTop >= diff) {
          swiper.allowTouchMove = true;
          removeListener({
            activeContent,
            activeInterface,
            touchContent,
            touchInterface,
          });
          return;
        }
      }
    };

    // 인터페이스 터치로 슬라이드 이동
    const touchInterface = (e: React.TouchEvent) => {
      // swiper.allowTouchMove 일 때, 인터페이스 div는 스크롤이 없기 때문에 최상단 스크롤을 움직임
      // 최상단 스크롤이 움직인 만큼 슬라이드 이동이 오버됨
      // 따라서 인터페이스 터치로 인한 최상단 스크롤 이동을 막기 위해 preventDefault
      if (e.type === "touchmove") {
        e.preventDefault();
        return;
      }

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
          activeContent,
          activeInterface,
          touchContent,
          touchInterface,
        });

        swiper.allowTouchMove = true;
        if (scrollUp < -5) swiper.slidePrev(300);
        else if (scrollUp > 5) swiper.slideNext(300);
      }
    };
    // 슬라이드를 위한 터치 감지를 끄고
    swiper.allowTouchMove = false;
    // contentDiv와 interfaceDiv에 각각 touchContent, touchInterface를 작동시키는 이벤트 리스너 장착
    addListener({
      activeContent,
      activeInterface,
      touchContent,
      touchInterface,
    });

    if (activeIndex === 0 && !hasListenerFirstSlide.current) {
      activeContent.addEventListener("touchend", touchContent);
      hasListenerFirstSlide.current = true;
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      className={`${style["swiper-container"]} ${
        isTransition ? style["disable-touch"] : ""
      }`}
      direction={"vertical"}
      autoHeight={true}
      onAfterInit={attatchListener}
      onTransitionStart={attatchListener}
      preventInteractionOnTransition={true}
      onBeforeTransitionStart={() => setIsTransition(true)}
      onTransitionEnd={() => setIsTransition(false)}
      longSwipesRatio={0.05}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
        if (idx % 2) {
          return (
            <SwiperSlide key={idx} className={style["swiper-card"]}>
              <div className={style["content-container"]}>
                <div className={style["content-wrapper"]}>
                  <div className={style["content"]}>
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                  </div>
                </div>
              </div>
              <FeedInterface />
            </SwiperSlide>
          );
        } else {
          return (
            <SwiperSlide key={idx} className={style["swiper-card"]}>
              <div className={style["content-container"]}>
                <div className={style["content-wrapper"]}>
                  <div className={style["content"]}>
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    00000하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                    하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                  </div>
                </div>
              </div>
              <FeedInterface />
            </SwiperSlide>
          );
        }
      })}
      {commentToggle && <Comment />}
    </Swiper>
  );
}
