"use client";

import Link from "next/link";
import style from "../settings.module.scss";
import { Icon } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { userInfoQuery } from "@/api/user";

export default function UserInfoNode() {
  const { data } = useQuery(userInfoQuery.myInfo());

  return (
    <div className={style["settings-content"]}>
      {data && (
        <Link className={style["link"]} href={"/user-info"}>
          {data.userName}
        </Link>
      )}
      <Icon iconName="rightArrow" />
    </div>
  );
}
