import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";

type CreateDummyDTO = {
  title: string;
  body: string;
  userId: number;
};

export const createDummy = (data: CreateDummyDTO): Promise<null> => {
  return axios.post(`/posts`, data);
};

export const useCreateDummy = () => {
  return useMutation({
    mutationFn: createDummy,
  });
};
