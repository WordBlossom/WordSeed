import InfoWrapper from "./_component/info-wrapper";
import InfoItem from "./_component/info-item";
export default function UserInfo() {
  return (
    <InfoWrapper>
      <InfoItem title={"작가명"} />
      <InfoItem title={"소개"} />
    </InfoWrapper>
  );
}
