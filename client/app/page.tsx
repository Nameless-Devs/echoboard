"use client";

import React, { useState, useEffect } from "react";
import PostEchoBoard from "../parts/components/PostEchoBoard";
import { EchoBoard } from "../parts/components/EchoBoard";


export default function Home() {
  
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
    </main>
  )
}
