import { axios } from "@/lib/axios";
import { UserDTO } from "../user/types";

export const postFollow = async ({ userId }: UserDTO) => {
  return await axios.post("/user/follow", {
    userId: userId,
  });
};

export const deleteFollow = async ({ userId }: UserDTO) => {
  return await axios.delete("/user/follow", {
    data: {
      userId: userId,
    },
  });
};

export const followQuery = {
  postFollow: (userId: number) => ({
    queryKey: ["postFollow", { userId }],
    queryFn: () => postFollow({ userId }),
  }),
  deleteFollow: (userId: number) => ({
    queryKey: ["deleteFollow", { userId }],
    queryFn: () => deleteFollow({ userId }),
  }),
};
