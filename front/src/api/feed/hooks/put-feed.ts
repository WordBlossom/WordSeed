import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import createContentStore from "@/stores/create-content";
import { putFeed } from "@/api/feed/apis/put-feed-api";

type usePutFeedOptions = {
  wordId: number;
  postType: "TEXT" | "PAINT" | "MUSIC" | "VIDEO";
  config?: MutationConfig<typeof putFeed>;
};

export const usePutFeed = ({ wordId, postType }: usePutFeedOptions) => {
  const router = useRouter();
  const beforeRoute = useSearchParams().get("from") as string;
  const queryClient = getQueryClient();
  const { cleanCreateContentState } = createContentStore();

  const wordFeedListQueryKey = {
    queryKey: [
      { [postType]: true },
      { wordId: String(wordId) },
      "wordFeedList",
    ],
  };
  const myFeedListQueryKey = {
    queryKey: [{ [postType]: true }, , "myFeedList"],
  };

  return useMutation({
    mutationFn: putFeed,
    onSuccess: () => {
      // 현재 작성한 작품까지 fetching할 수 있도록 wordFeedList와 myFeedList query invalidate
      queryClient.invalidateQueries({
        queryKey: wordFeedListQueryKey.queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: myFeedListQueryKey.queryKey,
      });

      // 이전 페이지로 이동
      router.replace(beforeRoute);
      // 작품 생성 스토어에 저장된 내용 초기화
      cleanCreateContentState();
    },
    onError: () => {
      alert("작품 수정 실패");
    },
  });
};
