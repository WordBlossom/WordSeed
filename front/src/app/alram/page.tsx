import { AlramWrapper, AlramItem } from "./_component";

export default function Alram() {
  return (
    // <></>
    <AlramWrapper>
      {Array.from({ length: 30 }, (_, idx) => idx).map((el) => (
        <AlramItem type={4} date={"2024.01.23"} key={el} />
      ))}
    </AlramWrapper>
  );
}
