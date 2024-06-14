import style from "./feedlist.module.scss";

export default function NoData() {
  return <p className={style["guidance"]}>검색 결과가 없습니다.</p>;
}
