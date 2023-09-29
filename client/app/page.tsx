"use client";
import React, { useState, useEffect } from "react";
import PostEchoBoard from "../parts/components/PostEchoBoard";
import { EchoBoard } from "../parts/components/EchoBoard";
import JwtAuth from "@/parts/components/JwtAuth";
import { useCookies } from "react-cookie";



export default function Home() {

  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
      <JwtAuth /> 
    </main>
  )
}
