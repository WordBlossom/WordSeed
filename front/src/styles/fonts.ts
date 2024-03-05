import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";

export const noto_sans = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "block",
});

export const noto_serif = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "block",
});

export const fontClassName: string = `${noto_sans.variable} ${noto_serif.variable}`;
