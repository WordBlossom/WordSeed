import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function CreateFeedButton() {
  const wordId = useParams().word_id[0];

  return (
    <Link href={`/create/${wordId}`}>
      <Button content={<Icon iconName="add" />} />
    </Link>
  );
}
