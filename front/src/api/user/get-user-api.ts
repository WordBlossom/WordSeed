import { axios } from "@/lib/axios";
import {
  DeleteUserInfo,
  EditMyInfo,
  EditMyInfoParams,
  MyInfo,
  UserDTO,
  UserInfo,
} from "./types";

export const getMyInfo = async (): Promise<MyInfo> => {
  return await axios.get("/user");
};

export const putMyInfo = async (
  params: EditMyInfoParams
): Promise<EditMyInfo> => {
  return await axios.put("/user", params);
};

export const deleteUser = async (): Promise<DeleteUserInfo> => {
  return await axios.delete("/user");
};

export const getUserInfo = async ({ userId }: UserDTO): Promise<UserInfo> => {
  return await axios.get(`/user/info?userId=${userId}`);
};

export const getFollowUser = async ({ userId }: UserDTO) => {
  return await axios.post("/user/follow", {
    userId: userId,
  });
};

export const getUnFollowUser = async ({ userId }: UserDTO) => {
  return await axios.delete("/user/follow", {
    data: {
      userId: userId,
    },
  });
};

export const userInfoQuery = {
  myInfo: () => ({
    queryKey: ["myInfo"],
    queryFn: () => getMyInfo(),
  }),
  editInfo: (params: EditMyInfoParams) => ({
    queryKey: ["myInfo", params],
    queryFn: () => putMyInfo(params),
  }),
  deleteUser: () => ({
    queryKey: ["deleteUser"],
    queryFn: () => deleteUser(),
  }),
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
