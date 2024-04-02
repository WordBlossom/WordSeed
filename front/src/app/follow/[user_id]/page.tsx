import { AuthorCategory, AuthorList } from "../_component";

export default function Follow({ params }: { params: { user_id: string } }) {
  const userId = Number(params.user_id);
  return (
    <>
      <AuthorCategory />
      <AuthorList userId={userId} />
    </>
  );
}
