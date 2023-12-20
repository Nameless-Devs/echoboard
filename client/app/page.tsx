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
  {label: 'Starting page', link: '/home'},
  {label: 'Chat', link: '/chatroom'}
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
        <Typography variant="h4" sx={{ textAlign: "center", marginTop: "1rem" }}>
          {user.name}, welcome to EchoBoard!
        </Typography>
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
        <p>Error fetching data</p>
      </>
    );
  }
  return (
    <>
      <h2>Please log in</h2>
    </>
  );
}
