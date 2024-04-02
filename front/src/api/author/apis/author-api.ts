import { axios } from "@/lib/axios";
import { FollowAuthorListDTO, AuthorList, AuthorListDTO } from "../types";

async function getAuthorList(params: AuthorListDTO): Promise<AuthorList> {
  return axios.get(`/user/list`, { params });
}

export const getFollowerList = async (
  params: FollowAuthorListDTO
): Promise<AuthorList> => {
  return await axios.get("/user/follow", { params });
};

export const authorQuery = {
  authorList: () => ({
    queryKey: (params: AuthorListDTO) => ["AuthorList", params],
    queryFn: (params: AuthorListDTO) => getAuthorList(params),
  }),
  followAuthorList: () => ({
    queryKey: (params: FollowAuthorListDTO) => ["FollowAuthorList", params],
    queryFn: (params: FollowAuthorListDTO) => getFollowerList(params),
  }),
};
