import { axios } from "@/lib/axios";
import { FollowAuthorDTO, AuthorList, AuthorListDTO } from "../types";

async function getAuthorList(params: AuthorListDTO): Promise<AuthorList> {
  return axios.get(`/user/list`, { params });
}

export const getFollowerList = async (
  params: FollowAuthorDTO
): Promise<AuthorList> => {
  return await axios.get("/user/follow", { params });
};

export const authorQuery = {
  authorList: () => ({
    queryKey: (params: AuthorListDTO) => ["AuthorList", params],
    queryFn: (params: AuthorListDTO) => getAuthorList(params),
  }),
  followAuthorList: () => ({
    queryKey: (params: FollowAuthorDTO) => ["FollowAuthorList", params],
    queryFn: (params: FollowAuthorDTO) => getFollowerList(params),
  }),
};
