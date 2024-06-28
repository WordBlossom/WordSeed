import { axios } from "@/lib/axios";
import { FollowAuthorListDTO, AuthorList, AuthorListDTO } from "../types";
import { axiosClient } from "@/lib/axios-client";

async function getAuthorList(params: AuthorListDTO): Promise<AuthorList> {
  return axios.get(`/user/list`, { params });
}

async function getClientAuthorList(params: AuthorListDTO): Promise<AuthorList> {
  return axiosClient.get(`/user/list`, { params });
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
  clientAuthorList: () => ({
    queryKey: (params: AuthorListDTO) => ["AuthorList", params],
    queryFn: (params: AuthorListDTO) => getClientAuthorList(params),
  }),
  followAuthorList: () => ({
    queryKey: (params: FollowAuthorListDTO) => ["FollowAuthorList", params],
    queryFn: (params: FollowAuthorListDTO) => getFollowerList(params),
  }),
};
