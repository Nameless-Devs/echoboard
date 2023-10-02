"use client";
import React from "react";
import PostEchoBoard from "../components/PostEchoBoard";
import { EchoBoard } from "../components/EchoBoard";
import JwtAuth from "@/components/JwtAuth";

export default function Home() {
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
      <JwtAuth />
    </main>
  );
}
