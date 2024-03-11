import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userInfoQuery } from "./get-user-api";
import { UserInfo } from "./types";
import { Author } from "../author/types";
import useSearchPageStateStore from "@/stores/search-page";

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
      // 진행중인 refetch가 있다면 취소시킨다.
      // 만약 그러지 않는다면 refetchOnMount등을 true로 해뒀을 때
      // 페이지를 들어오자 마자 refetch를 하면 refetch가 두번 실행되고,
      // 화면에 최신 데이터를 그려주지 않을 가능성이 있다.
      // 그것을 방지하기 위해 cancelQueries를 실행시켜준다.
      await queryClient.cancelQueries({ queryKey });

      // 이전 값
      const previousUserInfo = queryClient.getQueryData(
        userInfo.queryKey
      ) as UserInfo;

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

export const useListFollow = (
  userId: number,
  queryName: "followUser" | "unFollowUser"
) => {
  const queryClient = useQueryClient();
  const { queryKey, queryFn } = userInfoQuery[queryName](userId);
  const addFollow = queryName === "followUser" ? 1 : -1;
  const searchKeyword = useSearchPageStateStore().searchKeyword;
  const AuthorListQueryKey = ["AuthorList", { query: searchKeyword }];
  const myId = 4;

  return useMutation({
    mutationFn: queryFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousUserInfo = queryClient.getQueryData(
        AuthorListQueryKey
      ) as any;

      const updatedPages = previousUserInfo.pages.map((page: any) => {
        const updatedUsers = page.users.map((user: Author) => {
          if (user.userId === userId) {
            return {
              ...user,
              subscribed: !user.subscribed,
              recvCnt: user.recvCnt + addFollow,
            };
          }

          if (user.userId === myId) {
            return {
              ...user,
              sendCnt: user.sendCnt + addFollow,
            };
          }

          return user;
        });

        return { ...page, users: updatedUsers };
      });

      const updatedAuthorList = {
        pages: updatedPages,
        pageParams: previousUserInfo.pageParams,
      };

      queryClient.setQueryData(AuthorListQueryKey, updatedAuthorList);

      return { previousUserInfo };
    },

    onError(error, newData, context: any) {
      queryClient.setQueryData(AuthorListQueryKey, context.previousUserInfo);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
