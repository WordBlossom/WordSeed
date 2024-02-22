"use client";

import CreateCategory from "@/components/Navbar/create-category/create-category";
import { useState } from "react";

export default function CreateFeed() {
  const [selectedCategory, setSelectedCategory] = useState("글");

  return (
    <>
      <CreateCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}
