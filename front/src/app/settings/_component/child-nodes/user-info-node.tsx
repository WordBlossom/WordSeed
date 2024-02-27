"use client";

import Link from "next/link";
import style from "../settings.module.scss";
import { Icon } from "@/components";

export default function UserInfoNode() {
  return (
    <div className={style["settings-content"]}>
      <Link className={style["link"]} href={"/user-info"}>
        유저 이름
      </Link>
      <Icon iconName="rightArrow" />
    </div>
  );
}
