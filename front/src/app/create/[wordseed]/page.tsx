"use client";

import CreateCategory from "@/components/Navbar/create-category/create-category";
import { PostMedia, PostWrite } from "../_component";
import createContentStore from "@/stores/create-content";

export default function CreateFeed() {
  const type = createContentStore((state) => state.type);

  return (
    <>
      <CreateCategory />
      {type === "text" ? <PostWrite /> : <PostMedia />}
    </>
  );
}
