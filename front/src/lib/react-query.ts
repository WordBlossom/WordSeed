import { AxiosError } from "axios";
import {
  QueryClient,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: (error) => {
      if (error instanceof AxiosError)
        return error.response?.status ? error.response?.status >= 500 : true;
      else return true;
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 30 * 1000,
  },
};

function makeQueryClient() {
  return new QueryClient({ defaultOptions: queryConfig });
}

// server에서는 매번 새로운 query client 생성
// browser에서는 한 번만 생성
let browserQueryClient: QueryClient | undefined = undefined;
export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<ExtractFnReturnType<MutationFnType>, AxiosError>;

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> =
  Omit<
    UseInfiniteQueryOptions<
      ExtractFnReturnType<QueryFnType>,
      AxiosError,
      ExtractFnReturnType<QueryFnType>,
      ExtractFnReturnType<QueryFnType>,
      Array<string | Parameters<QueryFnType>[0]>,
      number
    >,
    "queryKey" | "getNextPageParam" | "initialPageParam"
  >;
