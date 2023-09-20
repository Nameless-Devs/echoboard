"use client";

import PostEchoBoard from "@/components/PostEchoBoard";
import { EchoBoard } from "../components/echoBoard";

export default function Home() {
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
    </main>
  );
}
