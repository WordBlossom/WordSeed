import { AlramWrapper, AlramItem } from "./_component";

export default function Alram() {
  return (
    <AlramWrapper>
      {Array.from({ length: 30 }, (_, idx) => idx).map((el) => (
        <AlramItem key={el} />
      ))}
    </AlramWrapper>
  );
}
