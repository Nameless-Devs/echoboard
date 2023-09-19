"use client";

import React, { useState, useEffect } from "react";
import PostEchoBoard from "../components/postEchoBoard";
import { EchoBoard } from "../components/echoBoard";

export default function Home() {
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
    </main>
  );
}
