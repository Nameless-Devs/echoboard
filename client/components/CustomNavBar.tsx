import React from 'react';
import { AppBar, Toolbar, Box, Button, Stack } from '@mui/material';
import { useRouter } from "next/navigation";
import EchoBoardLogo from './EchoBoardLogo';
import { ButtonInfo, UserResponseData } from '@/service/Types';
import { AccountMenu } from './AccountMenu';
import "../app/styles/UserPage.css"


type CustomAppBarProps = {
  buttons: ButtonInfo[];
  user?: UserResponseData;
};

const CustomNavBar: React.FC<CustomAppBarProps> = ({ buttons, user }) => {
  const router = useRouter();

  return (
    <AppBar className="nav-bar__user-page" position="static">
      <Toolbar className="tool-bar__user-page">
        <Box sx={{ flexGrow: 1 }}>
          <EchoBoardLogo />
        </Box>
          {user && <AccountMenu user={user} buttons={buttons} />}
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavBar;
