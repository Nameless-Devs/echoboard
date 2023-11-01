import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./provider";
import "./styles/Global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoBoard",
  description:
    "EchoBoard is a platform designed to address the challenge of effectively sharing and solving problems within the workplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <head>
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
        </head>
      <body className={inter.className}> <Providers>{children}</Providers></body>

    </html>
  );
}
