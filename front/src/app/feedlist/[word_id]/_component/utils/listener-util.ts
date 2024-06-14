import { HandleTouch, ListenerProps } from "../types";

export const handleTouchContent: HandleTouch =
  ({ swiper, touchStartY }) =>
  (e) => {
    // 현재 view에 보여지고 있는 슬라이드의 content Div 특정
    const activeSlide = swiper.visibleSlides[0];
    const activeContent = activeSlide.firstChild;

    if (e.type === "touchstart") {
      // 터치 시작점 저장
      touchStartY.current = e.touches[0].clientY;
      // 현재 스크롤 위치
      const scrollTop = activeContent.scrollTop;
      // 스크롤 가능 길이
      const scrollRange =
        activeContent.scrollHeight - activeContent.clientHeight;
      // 스크롤 최상단이거나 최하단일 경우 swiper touch 감지 on
      if (scrollTop <= 0 || scrollRange <= scrollTop)
        swiper.allowTouchMove = true;
    }

    // touchMove 이벤트는 swiper touch 감지가 켜져있을 때(스크롤 최상단 || 최하단)만 처리
    else if (
      swiper.allowTouchMove &&
      e.type === "touchmove" &&
      touchStartY.current
    ) {
      // 현재 content 스크롤 가능한 높이
      const scrollRange =
        activeContent.scrollHeight - activeContent.clientHeight;
      // 스크롤이 없으면 슬라이드 이동으로 마무리
      if (scrollRange === 0) return;

      // 현재 touch 위치
      const touchMoveY = e.changedTouches[0].clientY;
      // touchMoveY와 터치 시작 y좌표를 비교해서 터치 방향 확인
      const scrollUp = touchStartY.current - touchMoveY < 0;
      // 현재 스크롤 위치
      const scrollTop = activeContent.scrollTop;
      // 내부 스크롤 작동 = (스크롤 최상단 && 아래로 터치) || (스크롤 최하단 && 위로 터치)
      const scrollToInside =
        (scrollTop <= 0 && !scrollUp) || (scrollRange <= scrollTop && scrollUp);
      // 내부 스크롤 작동 경우이면 swiper touch 감지 off
      if (scrollToInside) swiper.allowTouchMove = false;
    }
  };

export const handleTouchInterface: HandleTouch =
  ({ swiper, touchStartY }) =>
  (e) => {
    if (e.type === "touchstart") {
      // swiper touch 감지 off
      swiper.allowTouchMove = false;
      // 터치 시작 y좌표 저장
      touchStartY.current = e.touches[0].clientY;
    }

    // touch start와 end의 좌표를 비교해서 터치 방향을 계산 후 슬라이드 이동
    else if (e.type === "touchend" && touchStartY.current) {
      // swiper touch 감지 on
      swiper.allowTouchMove = true;
      const touchEndY = e.changedTouches[0].clientY;
      const scrollUp = touchStartY.current - touchEndY;
      // 아이콘 터치를 위해 scrollUp의 절대값 5 이상인 경우에만 이동
      if (scrollUp < -5) swiper.slidePrev(300);
      else if (scrollUp > 5) swiper.slideNext(300);
    }
  };

export const addListener = ({
  swiper,
  touchStartY,
  activeContent,
  activeInterface,
  handleTouchContent,
  handleTouchInterface,
}: ListenerProps) => {
  const contentHandler = handleTouchContent({ swiper, touchStartY }) as any;
  const interfaceHandler = handleTouchInterface({ swiper, touchStartY }) as any;
  activeContent?.addEventListener("touchstart", contentHandler, {
    passive: true,
  });
  activeContent?.addEventListener("touchmove", contentHandler, {
    passive: true,
  });
  activeInterface?.addEventListener("touchstart", interfaceHandler, {
    passive: true,
  });
  activeInterface?.addEventListener("touchend", interfaceHandler, {
    passive: true,
  });
};
