export default function CreateFeed({
  params,
}: {
  params: { wordseed: string };
}) {
  const wordseed = params.wordseed;
  return (
    <>
      <h1>CreateFeed</h1>
      <h2>wordseed : {wordseed}</h2>
    </>
  );
}
