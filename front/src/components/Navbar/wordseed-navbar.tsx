"use client";

import { usePathname } from "next/navigation";
import { todaysDate } from "@/utils/getDateUtils";
import IncludeMenu from "./include-menu/include-menu";
import styles from "./navbar.module.scss";

export default function WordseedNavbar() {
  const pathName = usePathname();
  const dateFromPath = pathName.split("/").at(2);
  const date = dateFromPath ?? todaysDate;

  const [year, originMonth, originDay] = date.split("-");
  const [month, day] = [parseInt(originMonth), parseInt(originDay)];

  return (
    <IncludeMenu>
      <p className={styles.date}>{`${year}년 ${month}월 ${day}일`}</p>
    </IncludeMenu>
  );
}
