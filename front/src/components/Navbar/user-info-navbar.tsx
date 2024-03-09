"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button/Button";
import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
import useUserInfoStateStore from "@/stores/user-info";
import { EditMyInfoParams } from "@/api/user/types";
import { userInfoQuery } from "@/api/user";
import { useRouter } from "next/navigation";

export default function UserInfoNavbar() {
  const { authorName, selfIntroduction } = useUserInfoStateStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const params: EditMyInfoParams = {
    userName: authorName,
    userType: "USER",
    userDecp: selfIntroduction,
    informable: "TRUE",
  };
  const { queryFn } = userInfoQuery.editInfo(params);

  const useEdit = useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });

  const onClick = () => {
    useEdit.mutate();
    router.back();
  };
  return (
    <div className={styles.navbar}>
      <BackButton />
      <header className={styles.title}>개인정보수정</header>
      <Button content={"완료"} onClick={onClick} />
    </div>
  );
}
