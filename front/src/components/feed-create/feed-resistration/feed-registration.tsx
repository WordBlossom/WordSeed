"use client";

import createContentStore from "@/stores/create-content";
import CreateText from "./text/create-text";
import CreateMedia from "./media/create-media";

export default function FeedRegistration() {
  const type = createContentStore().type;
  return <>{type === "TEXT" ? <CreateText /> : <CreateMedia />}</>;
}
