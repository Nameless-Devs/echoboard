import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Image from "next/image";
import EchoLogo from "../app/image/EchoBoard_logo.png";

export const LoadingLogo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignitems: "center",
        paddingTop: "15rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Image
          src={EchoLogo}
          alt="EchoBoard logo"
          priority={true}
          width={90}
          style={{
            margin: "0 1rem",
          }}
        />
        <CircularProgress />
      </Box>
    </Box>
  );
};
