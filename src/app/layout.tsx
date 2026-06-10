import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntentPrompt - 把你的想法翻译成 AI 能理解的语言",
  description: "输入一句自然语言，自动生成专业 AI Prompt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
