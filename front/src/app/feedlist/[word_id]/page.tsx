"use client";

import { useFeedList, DEFAULT_POST_TYPE } from "@/api/feed";
import { WordFeedListDTO } from "@/api/feed/types";
import useSearchFilterStateStore from "@/stores/search-filter";
import SwiperComponent from "./_component/swiper-component";

type FeedlistProps = {
  params: { word_id: number };
};

export default function Feedlist({ params }: FeedlistProps) {
  const wordId = params.word_id;
  const { selectedType, isLatest } = useSearchFilterStateStore();
  const postType = selectedType ? selectedType : DEFAULT_POST_TYPE;

  const feedListParams: WordFeedListDTO = {
    wordId: wordId,
    postType: postType,
    sort: isLatest ? "DATE_DSC" : "LIKE_DSC",
  };

  const { data, status, fetchNextPage } = useFeedList({
    params: feedListParams,
    type: "word",
  });

  return (
    <>
      {status === "success" && (
        <SwiperComponent
          // // key를 설정하면 key가 달라질 때 이 컴포넌트가 새롭게 생성됨
          // // dataUpdatedAt으로 key를 설정하면 다음 페이지를 가져왔을 때 dataUpdatedAt가 달라져서
          // // 슬라이드가 다시 처음으로 되돌아 가게 됨
          // // 따라서 postType으로 key를 설정해서 postType이 달라질 때만 컴포넌트를 새롭게 생성하고
          // // 데이터가 추가되는 경우는 유지하도록 함
          postType={postType}
          data={data}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
}
