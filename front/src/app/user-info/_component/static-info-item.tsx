"use client";

import style from "./user-info.module.scss";
import { useQuery } from "@tanstack/react-query";
import { userInfoQuery } from "@/api/user";

type InfoItemProps = {
  title: "아이디";
};

enum InfoItemEnum {
  아이디 = "email",
}

export default function StaticInfoItem({ title }: InfoItemProps) {
  const { data } = useQuery(userInfoQuery.myInfo());

  return (
    <div className={style["info-item"]}>
      <div>
        <p className={style["title"]}>{title}</p>
      </div>
      <div className={style["content"]}>
        {data && <div>{data[InfoItemEnum[title]]}</div>}
      </div>
    </div>
  );
}
