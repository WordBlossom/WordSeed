import { axios } from "@/lib/axios";
import { Wordseed } from "./types";

export async function getWordseed(date: string): Promise<Wordseed> {
  return await axios.get(`/word?date=${date}`);
}
