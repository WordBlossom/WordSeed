import InfoWrapper from "./_component/info-wrapper";
import InfoItem from "./_component/info-item";
import Withdrawal from "./_component/withdrawal";
import StaticInfoItem from "./_component/static-info-item";

export default function UserInfo() {
  return (
    <InfoWrapper>
      <StaticInfoItem title="아이디" />
      <InfoItem title="작가명" />
      <InfoItem title="소개" />
      <Withdrawal type="로그아웃" />
      <Withdrawal type="회원탈퇴" />
    </InfoWrapper>
  );
}
