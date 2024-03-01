export type WordseedListDTO = {
  query: string;
  page?: number;
  size?: number;
};

export type Wordseed = {
  wordId: number;
  word: string;
  createdAt: string;
};

export type WordseedList = {
  words: Wordseed[];
};
