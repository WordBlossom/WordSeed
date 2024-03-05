import { FetchNextPageOptions } from "@tanstack/react-query";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Wordseed } from "@/api/wordseed/types";
import { AxiosError } from "axios";

export type WordseedListFetchNextPage = (
  options?: FetchNextPageOptions | undefined
) => Promise<
  InfiniteQueryObserverResult<
    {
      pages: Wordseed[];
      pageParams: number[];
    },
    AxiosError<unknown, any>
  >
>;
