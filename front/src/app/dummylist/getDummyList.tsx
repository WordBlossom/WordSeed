import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Dummy } from "./dummyType";

export const getDummyList = (): Promise<Dummy[]> => {
  return axios.get(`/posts`);
};

type QueryFnType = typeof getDummyList;

type UseDummyListOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDummyList = ({ config }: UseDummyListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["dummyList"],
    queryFn: () => getDummyList(),
    ...config,
  });
};
