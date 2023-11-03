"use client";
import { UserPage } from "@/components/UserPage/UserPage";
import { getUserInfo } from "@/service/Functions";
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import React from "react";
import "../styles/UserPage.css"
import EchoBoardLogo from "@/components/EchoBoardLogo";

export default function UserProfile() {
  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (user) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
        {/* Nav Bar */}
        <AppBar className="nav-bar__user-page" position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} >
              <EchoBoardLogo />
            </Box>
            <Stack direction="row" spacing={2}>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Chat</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Main */}
        <Box sx={{ flexGrow: 1, backgroundColor: "#FAF9F6", overflow: "auto" }}>
          <UserPage user={user} />
        </Box>
      </Box>
    );
  }
}
