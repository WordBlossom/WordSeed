import { SearchButtons, SearchList } from "./_component/";
import style from "./_component/search.module.scss";

export default function Search() {
  return (
    <main className={style["main"]}>
      <SearchButtons />
      <SearchList />
    </main>
  );
}
