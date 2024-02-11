import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      content={<Icon iconName="leftArrow" />}
      onClick={() => router.back()}
    />
  );
}
