import { DEFAULT_POST_TYPE } from "@/api/feed";
import { FeedListDTO, FeedTypeEnum, UserFeedListDTO } from "@/api/feed/types";
import profileToggleStore from "@/stores/profile-toggle";
import useSearchFilterStateStore from "@/stores/search-filter";

export const useFeedProps = (isMe: boolean) => {
  const { selected } = profileToggleStore();
  const { selectedType, isLatest } = useSearchFilterStateStore();
  const postType = selectedType ? selectedType : DEFAULT_POST_TYPE;

  const feedListParams: FeedListDTO = {
    postType: postType,
    sort: isLatest ? "DATE_DSC" : "LIKE_DSC",
  };

  const userFeedListParams: UserFeedListDTO = {
    ...feedListParams,
    userId: 4,
  };

  const feedType = isMe
    ? selected
      ? FeedTypeEnum.Bookmark
      : FeedTypeEnum.My
    : FeedTypeEnum.User;

  const props = {
    params: isMe ? feedListParams : userFeedListParams,
    type: feedType,
  };

  return [props];
};
