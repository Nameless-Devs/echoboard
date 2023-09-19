"use client";

import React, { useState, useEffect } from "react";
import PostEchoBoard from "../components/PostEchoBoard";
import { EchoBoard } from "../components/EchoBoard";

export default function Home() {
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
    </main>
  );
}
