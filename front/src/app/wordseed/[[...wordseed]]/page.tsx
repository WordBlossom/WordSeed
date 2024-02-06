export default function Wordseed({ params }: { params: { wordseed: string } }) {
  const wordseed = params.wordseed ? params.wordseed : "Today's Wordseed";
  return (
    <>
      <h1>Wordseed</h1>
      <h2>Wordseed : {wordseed}</h2>
    </>
  );
}
