import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
          bgcolor: "#E5E4E2",
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
        <Button variant="outlined" size="small">
          <Link href={"http://localhost:8080/echoes"}>
            Join the Community
          </Link>
        </Button>
      </Toolbar>
    </>
  );
}
