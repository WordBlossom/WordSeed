export default function Search({ params }: { params: { keyword: string } }) {
  const keyword = params.keyword;

  if (!keyword) {
    return <h1>검색어를 입력해주세요</h1>;
  }

  if (keyword) {
    return (
      <>
        <h1>Search</h1>
        <h2>keyword : {keyword}</h2>
      </>
    );
  }
}
