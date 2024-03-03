import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { userDTO, userInfo } from "./types";

export const getUserInfo = async (): Promise<userInfo> => {
  return await axios.get(`/user/info?userId=10`);
};

type queryFnType = () => Promise<userInfo>;

// export const getUserInfo2 = async ({ userId }: userDTO): queryFnType => {
//   return await axios.get(`/user/info?userId=${userId}`);
// };
export const getUserInfo2 = async function () {
  return await axios.get(`/user/info?userId=9`);
};

type QueryFnType = typeof getUserInfo;

type UseUserInfoOptions = {
  params: userDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useUserInfo = ({ params, config }: UseUserInfoOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["user", params],
    queryFn: () => getUserInfo(),
    ...config,
  });
};
