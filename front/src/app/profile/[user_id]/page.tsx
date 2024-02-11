"use client";

import { useInView } from "react-intersection-observer";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";

export default function Profile({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  const { setIsFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [ref] = useInView({
    onChange: (inView) => {
      setIsFilterButtonHidden(inView);
    },
    initialInView: true,
  });

  return (
    <>
      <h1>Profile</h1>
      <h2>userId : {userId}</h2>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div ref={ref}>Target</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
      <div>good morning</div>
    </>
  );
}
