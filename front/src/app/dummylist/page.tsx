"use client";

import { useDummyList } from "./getDummyList";
import { useCreateDummy } from "./createDummy";

export default function DummyList() {
  const createDummyQuery = useCreateDummy();
  const { isPending, isError, error, data: dummyList } = useDummyList({});

  // 추가할 dummy
  const temp = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  const handleClick = () => {
    // temp date post 요청
    createDummyQuery.mutate(temp, {
      // onSuccess() {
      //   // 이후 작업
      // },
    });
  };

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <button onClick={handleClick}>add dummy</button>
      {dummyList.map((dummy) => (
        <div key={dummy.id}>
          <h1>{dummy.id}</h1>
          <h1>{dummy.userId}</h1>
          <h1>{dummy.title}</h1>
          <h1>{dummy.body}</h1>
        </div>
      ))}
    </>
  );
}
