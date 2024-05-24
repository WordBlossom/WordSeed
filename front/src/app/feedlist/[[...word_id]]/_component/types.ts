import { MutableRefObject, TouchEvent } from "react";
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

interface HandleTouchParams {
  swiper: any;
  touchStartY: MutableRefObject<number | null>;
}

export type HandleTouch = ({
  swiper,
  touchStartY,
}: HandleTouchParams) => (e: TouchEvent) => void;

export interface ListenerProps extends HandleTouchParams {
  activeContent: HTMLDivElement;
  activeInterface: HTMLDivElement;
  handleTouchContent: HandleTouch;
  handleTouchInterface: HandleTouch;
}
