import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mixponto",
  description: "Sistema de ponto e gestão de recursos humanos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
