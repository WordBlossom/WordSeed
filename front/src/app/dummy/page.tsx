"use client";

import { Icon } from "@/components";
import styles from "./styles.module.scss";

import { useDummy } from "./getDummy";

export default function Dummy() {
  const dummyNum = 1;
  const { isPending, isError, error, data: dummy } = useDummy({ dummyNum });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.test}>
      <h1>{dummy.id}</h1>
      <h1>{dummy.title}</h1>
      <h1>{dummy.userId}</h1>
      <h1>{dummy.completed ? "True" : "False"}</h1>
      {/* <Icon iconName="copyBlack" /> */}
    </div>
  );
}
