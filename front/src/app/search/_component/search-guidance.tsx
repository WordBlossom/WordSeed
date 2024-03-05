import style from "./search.module.scss";

type SearchGuidanceProps = {
  searchKeyword?: string;
};

export default function SearchGuidance({ searchKeyword }: SearchGuidanceProps) {
  return (
    <p className={style["guidance"]}>
      {searchKeyword
        ? `${searchKeyword}에 대한 검색 결과가 없습니다.`
        : "검색어를 입력해 주세요."}
    </p>
  );
}
