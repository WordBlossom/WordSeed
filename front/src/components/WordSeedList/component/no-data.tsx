import style from "../WordSeedList.module.scss";

type NoDataProps = {
  searchKeyword: string;
};

export default function NoData({ searchKeyword }: NoDataProps) {
  return (
    <p className={style["guidance"]}>
      {`"${searchKeyword}" 에 대한 검색 결과가 없습니다.`}
    </p>
  );
}
