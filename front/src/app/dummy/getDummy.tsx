import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Dummy } from "./dummyType";

export const getDummy = (dummyNum: number): Promise<Dummy> => {
  return axios.get(`/todos/${dummyNum}`);
};

type QueryFnType = typeof getDummy;

type UseDummyOptions = {
  dummyNum: number;
  config?: QueryConfig<QueryFnType>;
};

export const useDummy = ({ dummyNum, config }: UseDummyOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["dummy", dummyNum],
    queryFn: () => getDummy(dummyNum),
    ...config,
  });
};
