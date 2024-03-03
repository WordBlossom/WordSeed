import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  QueryState,
  QueryKey,
} from "@tanstack/react-query";
import { cache } from "react";
import { isEqual } from "@/utils";

export const getQueryClient = cache(() => new QueryClient());

//? 프로미스를 주면 프로미스 안의 타입을 반환
//? 프로미스로 추론되지 않는다면 제네릭을 그대로 반환
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

//? QueryKey: 리액트 쿼리에서 제공하는 쿼리 키의 타입
//? queryFn: 프로미스로 감싸진 제네릭을 반환하는 함수 타입
interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) =>
    isEqual(query.queryKey, queryKey)
  );

  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q["queryFn"]>>
  >;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]["queryFn"]>>
  >[];
}

export const Hydrate = HydrationBoundary;

export default {};
