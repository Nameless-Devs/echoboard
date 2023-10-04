"use client";
import React, { useState } from "react";
import PostEchoBoard from "../parts/components/PostEchoBoard";
import { EchoBoard } from "../parts/components/EchoBoard";
import JwtAuth from "@/parts/components/JwtAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/parts/Functions";
import { Button } from "@mui/material";
import { AccountMenu } from "@/parts/components/AccountMenu";

export default function Home() {
  const { data: user, isLoading, error } = useQuery(['userInfo'], getUserInfo);
  const [ isVisiblePostEcho, setIsVisiblePostEcho ] = useState(false);
  
  const handleClick = () => {
    setIsVisiblePostEcho(!isVisiblePostEcho);
  }

  if (user){
  return (
    <main style={{display: "flex", flexDirection: "column" }}>
      <AccountMenu {...user} /> 
      <h1 style={{textAlign: "center"}}>{user.name}, welcome to EchoBoard!</h1>
      <Button 
            onClick={handleClick}
            variant="outlined" 
            type="submit"
            style={{width: "30%", maxWidth: "300px" , margin: "15px auto"}}>
            Share your problem
          </Button>
      { isVisiblePostEcho &&  <PostEchoBoard {...user}    /> }
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
