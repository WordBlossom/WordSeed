"use client";

import { useInView } from "react-intersection-observer";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
import { ContentCardList } from "@/components";
import Header from "../_component/Header";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

const userData = {
  userId: 1,
  userName: "초아누리",
  userDecp:
    "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
  recvCnt: 12000001,
  sendCnt: 2100,
  subscribed: false,
};

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
    url: "https://i2.ruliweb.net/ori/24/02/17/18db50369258db08.mp4",
  },
  {
    postId: 4,
    type: "video",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://i2.ruliweb.net/ori/24/02/15/18dab844b3f484f84.mp4",
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
      <Header {...userData} />
      <h2>userId : {userId}</h2>
      <div ref={ref}>Target</div>
      <ContentCardList datas={datas} />
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
      <div>page</div>
    </>
  );
}
