import InfoWrapper from "./_component/info-wrapper";
import InfoItem from "./_component/info-item";
import Withdrawal from "./_component/withdrawal";

export default function UserInfo() {
  return (
    <InfoWrapper>
      <InfoItem title={"작가명"} />
      <InfoItem title={"소개"} />
      <Withdrawal />
    </InfoWrapper>
  );
}
