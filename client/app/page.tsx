"use client";
import React, { useState } from "react";
import PostEchoBoard from "../components/PostEchoBoard/PostEchoBoard";
import { EchoBoard } from "@/components/EchoBoard/EchoBoard";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/Functions";
import { Button, Typography } from "@mui/material";
import { LoadingLogo } from "@/components/LoadingLogo";
import JwtAuth from "@/components/JwtAuth";
import CustomNavBar from "@/components/CustomNavBar";
import NoUserNavBar from "@/components/NoUserNavBar";
import {NoUserEchoBoard} from "@/components/EchoBoard/NoUserEchoBoard";

const buttons = [
  {label: 'Chat', link: '/chatroom'},
  {label: 'Landing page', link: '/home'}
];

export default function Home() {
  const { data: user, isLoading, error } = useQuery(["userInfo"], getUserInfo);
  const [isVisiblePostEcho, setIsVisiblePostEcho] = useState(false);

  const handleClick = () => {
    setIsVisiblePostEcho(!isVisiblePostEcho);
  };

  if (user) {
    return (
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAF9F6",
        }}
      >
        <CustomNavBar buttons={buttons} user={user} />
        <Button
          onClick={handleClick}
          variant="outlined"
          type="submit"
          style={{ width: "30%", maxWidth: "300px", margin: "15px auto" }}
        >
          Share your problem
        </Button>
        {isVisiblePostEcho && <PostEchoBoard {...user} />}
        <EchoBoard {...user} />
        <JwtAuth />
      </main>
    );
  }
  if (isLoading) {
    return <LoadingLogo />;
  }
  if (error) {
    return (
        <>
          <NoUserNavBar buttons={buttons} />
          <NoUserEchoBoard/>
        </>
    );
  }
}
