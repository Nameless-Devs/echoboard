"use client";
import { UserPage } from "@/components/UserPage/UserPage";
import { getUserInfo } from "@/service/Functions";
import {
  AppBar,
  Button,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import React from "react";

export default function UserProfile() {
  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (user) {
    console.log(user);
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Nav Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
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
