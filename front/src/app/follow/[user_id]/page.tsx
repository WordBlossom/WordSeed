export default function Follow({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  return (
    <>
      <h1>Follow</h1>
      <h2>userId : {userId}</h2>
    </>
  );
}
