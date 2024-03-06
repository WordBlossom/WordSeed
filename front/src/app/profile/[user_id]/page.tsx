"use client";

import { useInView } from "react-intersection-observer";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
import { ContentCardList } from "@/components";
import { Header, ProfileCategory } from "../_component";
import { userInfoQuery } from "@/api/user/get-user-api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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

type ProfileProps = {
  params: { user_id: number };
};

export default function Profile({ params }: ProfileProps) {
  const { setIsFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [ref] = useInView({
    threshold: 1,
    onChange: (inView) => {
      setIsFilterButtonHidden(inView);
    },
    initialInView: true,
  });

  const userId = Number(params.user_id);
  const { queryKey, queryFn } = userInfoQuery.userInfo(userId);
  const { data } = useQuery({ queryKey, queryFn });

  const contentData = useMemo(() => {
    return datas;
  }, []);

  return (
    <>
      {data && <Header {...data} />}
      <ProfileCategory categoryRef={ref} params={params} />
      <ContentCardList datas={contentData} />
    </>
  );
}
