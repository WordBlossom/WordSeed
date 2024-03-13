"use client";

import profileToggleStore from "@/stores/profile-toggle";
import styles from "./author-list.module.scss";
import { ArtistCardList } from "@/components";
import { useFollowAuthorList } from "@/api/author";

export default function AuthorList({ userId }: { userId: number }) {
  const { selected } = profileToggleStore();

  const { data, fetchNextPage } = useFollowAuthorList({
    params: {
      userId: userId,
      type: selected ? "RECV" : "SEND",
    },
  });

  return (
    <div className={styles.wrapper}>
      {data && (
        <ArtistCardList data={data?.pages} fetchNextPage={fetchNextPage} />
      )}
    </div>
  );
}
