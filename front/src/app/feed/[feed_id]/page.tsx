export default function Feed({ params }: { params: { feed_id: string } }) {
  const feedId = params.feed_id;
  return (
    <>
      <h1>Feed</h1>
      <h2>feedId : {feedId}</h2>
    </>
  );
}
