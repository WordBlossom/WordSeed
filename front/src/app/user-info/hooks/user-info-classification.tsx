import useUserInfoStateStore from "@/stores/user-info";

type ContentForType = {
  작가명: ["authorName", "setAuthorName", string];
  소개: ["selfIntroduction", "setSelfIntroduction", string];
};

const contentFor: ContentForType = {
  작가명: ["authorName", "setAuthorName", "작가명을 입력해 주세요."],
  소개: ["selfIntroduction", "setSelfIntroduction", "한 줄 소개를 남겨주세요."],
};

export default function useUserInfoClassification(title: "작가명" | "소개") {
  const userInfoState = useUserInfoStateStore();
  const [contentType, dispatcherType, placeholder] = contentFor[title];
  const [content, setContent] = [
    userInfoState[contentType],
    userInfoState[dispatcherType],
  ];

  return [content, setContent, placeholder] as const;
}
