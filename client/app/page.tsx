"use client";
import React, { useState } from "react";
import PostEchoBoard from "../components/PostEchoBoard/PostEchoBoard";
import { EchoBoard } from "@/components/EchoBoard/EchoBoard";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/Functions";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { AccountMenu } from "@/components/AccountMenu";
import EchoBoardLogo from "@/components/EchoBoardLogo";
import "./styles/UserPage.css";
import { useRouter } from "next/navigation";
import { LoadingLogo } from "@/components/LoadingLogo";
import JwtAuth from "@/components/JwtAuth";

export default function Home() {
  const { data: user, isLoading, error } = useQuery(["userInfo"], getUserInfo);
  const [isVisiblePostEcho, setIsVisiblePostEcho] = useState(false);

  const handleClick = () => {
    setIsVisiblePostEcho(!isVisiblePostEcho);
  };

  const router = useRouter();

  if (user) {
    return (
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAF9F6",
        }}
      >
        <AppBar className="nav-bar__user-page" position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <EchoBoardLogo />
            </Box>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" onClick={() => router.push("/home")}>
                Starting page
              </Button>
              <Button color="inherit" onClick={() => router.push("/chatroom")}>
                Chat
              </Button>
              <AccountMenu {...user} />
            </Stack>
          </Toolbar>
        </AppBar>
        <h1 style={{ textAlign: "center" }}>
          {user.name}, welcome to EchoBoard!
        </h1>
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
