import { ArtistCard } from "@/components";

export default function Follow({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  return (
    <>
      <h1>Follow</h1>
      <h2>userId : {userId}</h2>
      <ArtistCard
        userId={1}
        userName="초아누리"
        userDecp="모든순간을사랑하며살고싶은사람모든순간을 사랑하며살고싶은사람모든순간을사랑하며살고싶은 사람모든순간sadasda sda sda sdasdasdsd"
        recvCnt={10}
        sendCnt={200}
        subscribed={true}
      />
    </>
  );
}
