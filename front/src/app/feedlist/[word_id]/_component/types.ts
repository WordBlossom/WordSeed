import { MutableRefObject } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FeedDetail } from "@/api/feed/types";
import { AxiosError } from "axios";

export type FeedListData =
  | undefined
  | {
      pages: FeedDetail[];
      pageParams: number[];
    };

export type FeedListFetchNextPage = (
  options?: FetchNextPageOptions | undefined
) => Promise<
  InfiniteQueryObserverResult<
    {
      pages: FeedDetail[];
      pageParams: number[];
    },
    AxiosError<unknown, any>
  >
>;

export type ListenerProps = {
  activeContentRef: MutableRefObject<HTMLDivElement | null>;
  activeInterfaceRef: MutableRefObject<HTMLDivElement | null>;
  // any... :(
  touchContent: any;
  touchInterface: any;
};
