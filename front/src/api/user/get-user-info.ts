import { axios } from "@/lib/axios";
import { userDTO, userInfo } from "./types";

export const getUserInfo = async ({ userId }: userDTO): Promise<userInfo> => {
  return await axios.get(`/user/info?userId=${userId}`);
};

export const userInfoQuery = {
  userInfo: (userId: number) => ({
    queryKey: ["userInfo", { userId }],
    queryFn: () => getUserInfo({ userId }),
  }),
};
