"use client";
import React, { useState, useEffect } from "react";
import PostEchoBoard from "../parts/components/PostEchoBoard";
import { EchoBoard } from "../parts/components/EchoBoard";
import JwtAuth from "@/parts/components/JwtAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/parts/Functions";
import { text } from "stream/consumers";

export default function Home() {
  const { data: user, isLoading, error } = useQuery(['userInfo'], getUserInfo);
  if (user){
  return (
    <main>
      <h1 style={{textAlign: "center"}}>{user.name}, welcome to EchoBoard!</h1>
      <PostEchoBoard {...user}    />
      <EchoBoard {...user} />
      <JwtAuth /> 
    </main>
  )
  }
  if(isLoading){
    return (
      <p>Loading...</p>
    )
  }
  if(error){
    return (
      <>
      <p>Error fetching data</p>
      </>
    )
  }
  return (
    <>
    <h2>Please log in</h2>
    </>
  )
}
