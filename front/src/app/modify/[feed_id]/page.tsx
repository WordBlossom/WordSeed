export default function ModifyFeed({
  params,
}: {
  params: { feed_id: string };
}) {
  const feedId = params.feed_id;
  return (
    <>
      <h1>ModifyFeed</h1>
      <h2>feedId : {feedId}</h2>
    </>
  );
}
