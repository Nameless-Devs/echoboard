"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Mui blue
    },
    secondary: {
      main: "#9c27b0",
    },

    error: {
      main: "#d32f2f",
    },

    warning: {
      main: "#ed6c02",
    },

    info: {
      main: "#06254f",
    },

    success: {
      main: "#2e7d32", // MUI green
    },

    background: {
      default: "#FAF9F6", // Off white used as background color
      paper: "#FFFFFF", // Rendered posts, input fields
    },
  },
});

export default theme;
