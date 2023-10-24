import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import EchoLogo from "../image/EchoLogo.png";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "white",
          borderRadius: "8px",
        }}
      >
        <Image src={EchoLogo} alt="EchoBoard Logo" width={40} />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </>
  );
}
