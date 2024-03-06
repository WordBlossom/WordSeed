"use client";

import { useInView } from "react-intersection-observer";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
import { ContentCardList } from "@/components";
import { Header, ProfileCategory } from "../_component";

type ProfileProps = {
  params: { user_id: number };
};

export default function Profile({ params }: ProfileProps) {
  const { setIsFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [ref] = useInView({
    threshold: 1,
    onChange: (inView) => {
      setIsFilterButtonHidden(inView);
    },
    initialInView: true,
  });

  const userId = Number(params.user_id);

  return (
    <>
      <Header userId={userId} />
      <ProfileCategory categoryRef={ref} params={params} />
      <ContentCardList />
    </>
  );
}
