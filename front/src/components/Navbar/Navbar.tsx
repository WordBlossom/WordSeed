"use client";

import { usePathname } from "next/navigation";
import FeedListNavbar from "./feedlist-navbar";
import FollowNavbar from "./follow-navbar";
import WordseedNavbar from "./wordseed-navbar";
import UserInfoNavbar from "./user-info-navbar";
import CreateNavbar from "./create-navbar";
import SettingsNavbar from "./settings-navbar";
import WordListNavbar from "./wordlist-navbar";
import SearchNavbar from "./search-navbar";
import ProfileNavbar from "./profile-navbar";
import ModifyNavbar from "./modify-navbar";
import FeedNavbar from "./feed-navbar";
import AlramNavbar from "./alram-navbar";
export default function Navbar() {
  const pathname = usePathname();
  const routeSegment = pathname.split("/");
  switch (routeSegment[1]) {
    case "":
    case "wordseed":
      return <WordseedNavbar />;
    case "feed":
      return <FeedNavbar />;
    case "feedlist":
      return <FeedListNavbar />;
    case "follow":
      return <FollowNavbar />;
    case "user-info":
      return <UserInfoNavbar />;
    case "create":
      return <CreateNavbar />;
    case "modify":
      return <ModifyNavbar />;
    case "settings":
      return <SettingsNavbar />;
    case "wordlist":
      return <WordListNavbar />;
    case "search":
      return <SearchNavbar />;
    case "alram":
      return <AlramNavbar />;
    case "profile":
      return <ProfileNavbar userId={routeSegment[2]} />;
  }
}
