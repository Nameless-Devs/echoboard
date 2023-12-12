"use client";
import { UserPage } from "@/components/UserPage/UserPage";
import { getUserInfo } from "@/service/Functions";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import React from "react";
import "../styles/UserPage.css";
import EchoBoardLogo from "@/components/EchoBoardLogo";
import { useRouter } from "next/navigation";
import { LoadingLogo } from "@/components/LoadingLogo";
import CustomNavBar from "@/components/CustomNavBar";

const buttons = [
  { label: 'Home', link: '/' },
  { label: 'Chat', link: '/chatroom' }
];

export default function UserProfile() {
  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);

  const router = useRouter();

  if (isLoading) {
    return <LoadingLogo />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <CustomNavBar buttons={buttons} user={user} />
        <Box sx={{ flexGrow: 1, backgroundColor: "#FAF9F6", overflow: "auto" }}>
          <UserPage user={user} />
        </Box>
      </Box>
    );
  }
}
