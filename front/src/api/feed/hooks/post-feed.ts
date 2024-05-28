import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import createContentStore from "@/stores/create-content";
import { postFeed } from "@/api/feed/apis/post-feed-api";
import { PostFeedDTO } from "@/api/feed/types";

type usePostFeedOptions = {
  wordId: PostFeedDTO["wordId"];
  config?: MutationConfig<typeof postFeed>;
};

export const usePostFeed = ({ wordId }: usePostFeedOptions) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const invalidateQueryKey = ["wordFeedlist", { wordId }];
  const { cleanCreateContentState } = createContentStore();

  return useMutation({
    mutationFn: postFeed,
    onSuccess: () => {
      // 현재 작성한 작품까지 fetching할 수 있도록 해당 feedlist 페이지의 query invalidate
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
      });
      // 작성한 wordId의 feedlist 페이지로 이동
      router.push(`/feedlist/${wordId}`);
      // 스토어에 저장된 내용 초기화
      cleanCreateContentState();
    },
    onError: () => {
      alert("작품 업로드 실패");
    },
  });
};
