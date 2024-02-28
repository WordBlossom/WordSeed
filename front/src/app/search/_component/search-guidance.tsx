import style from "./search.module.scss";

type SearchGuidanceProp = {
  searchKeyword: string;
  hasData: boolean;
};

export default function SearchGuidance({
  searchKeyword,
  hasData,
}: SearchGuidanceProp) {
  if (!searchKeyword)
    return <p className={style["guidance"]}>검색어를 입력해 주세요.</p>;

  if (!hasData)
    return (
      <p className={style["guidance"]}>
        {`"${searchKeyword}" 에 대한 검색 결과가 없습니다.`}
      </p>
    );

  return <></>;
}
