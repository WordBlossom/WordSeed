import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userInfoQuery } from "./get-user-api";
import { userInfo } from "./types";

export const useFollow = (
  userId: number,
  queryName: "followUser" | "unFollowUser"
) => {
  const queryClient = useQueryClient();
  const { queryKey, queryFn } = userInfoQuery[queryName](userId);
  const userInfo = userInfoQuery.userInfo(userId);
  const addFollow = queryName === "followUser" ? 1 : -1;

  return useMutation({
    mutationFn: queryFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      // 이전 값
      const previousUserInfo = queryClient.getQueryData(
        userInfo.queryKey
      ) as userInfo;

      // 새로운 값으로 낙관적 업데이트 진행
      queryClient.setQueryData(userInfo.queryKey, {
        ...previousUserInfo,
        subscribed: !previousUserInfo.subscribed,
        recvCnt: previousUserInfo.recvCnt + addFollow,
      });

      // 값이 들어있는 context 객체를 반환
      return { previousUserInfo };
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, newData, context: any) {
      queryClient.setQueryData(userInfo.queryKey, context.previousUserInfo);
    },
    // 오류 또는 성공 후에는 항상 refetch
    onSettled() {
      queryClient.invalidateQueries({ queryKey: userInfo.queryKey });
    },
  });
};
