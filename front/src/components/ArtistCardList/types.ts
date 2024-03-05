import { FetchNextPageOptions } from "@tanstack/react-query";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Author } from "@/api/author/types";
import { AxiosError } from "axios";

export type ArtistCardListFetchNextPage = (
  options?: FetchNextPageOptions | undefined
) => Promise<
  InfiniteQueryObserverResult<
    {
      pages: Author[];
      pageParams: number[];
    },
    AxiosError<unknown, any>
  >
>;
