import { axios } from "@/lib/axios";
import { userDTO, userInfo } from "./types";

export const getUserInfo = async ({ userId }: userDTO): Promise<userInfo> => {
  return await axios.get(`/user/info?userId=${userId}`);
};

export const getFollowUser = async ({ userId }: userDTO) => {
  return await axios.post("/user/follow", {
    userId: userId,
  });
};

export const getUnFollowUser = async ({ userId }: userDTO) => {
  return await axios.delete("/user/follow", {
    data: {
      userId: userId,
    },
  });
};

export const userInfoQuery = {
  userInfo: (userId: number) => ({
    queryKey: ["userInfo", { userId }],
    queryFn: () => getUserInfo({ userId }),
  }),
  followUser: (userId: number) => ({
    queryKey: ["follow", { userId }],
    queryFn: () => getFollowUser({ userId }),
  }),
  unFollowUser: (userId: number) => ({
    queryKey: ["unFollow", { userId }],
    queryFn: () => getUnFollowUser({ userId }),
  }),
};
