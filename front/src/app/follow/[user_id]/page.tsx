import { ArtistCardList } from "@/components";

const fakeDatas = [
  {
    userId: 1,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 2,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 3,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 4,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 5,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 6,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 7,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 8,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
];

export default function Follow({ params }: { params: { user_id: string } }) {
  const userId = params.user_id;
  return (
    <>
      <h1>Follow</h1>
      <h2>userId : {userId}</h2>
      <ArtistCardList datas={fakeDatas} />
    </>
  );
}
