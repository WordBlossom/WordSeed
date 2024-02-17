"use client";

import { useInView } from "react-intersection-observer";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
import { ContentCardList } from "@/components";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

const datas: ContentCardProps[] = [
  {
    postId: 1,
    type: "text",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://velog.velcdn.com/images/shrewslampe/post/b455111f-8921-4a48-908f-f5fea743d286/image.png",
  },
  {
    postId: 2,
    type: "img",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://velog.velcdn.com/images/shrewslampe/post/b455111f-8921-4a48-908f-f5fea743d286/image.png",
  },
  {
    postId: 3,
    type: "video",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://player.vimeo.com/video/910530517?title=0&portrait=0&byline=0&muted=1",
  },
];

export default function Profile({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  const { setIsFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [ref] = useInView({
    onChange: (inView) => {
      setIsFilterButtonHidden(inView);
    },
    initialInView: true,
  });

  return (
    <>
      <h1>Profile</h1>
      <h2>userId : {userId}</h2>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div ref={ref}>Target</div>
      <ContentCardList datas={datas} />
    </>
  );
}
