export default function Profile({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  return (
    <>
      <h1>Profile</h1>
      <h2>userId : {userId}</h2>
    </>
  );
}
