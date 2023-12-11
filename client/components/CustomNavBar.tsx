import React from 'react';
import { AppBar, Toolbar, Box, Button, Stack } from '@mui/material';
import { useRouter } from "next/navigation";
import EchoBoardLogo from './EchoBoardLogo';
import { UserResponseData } from '@/service/Types';
import { AccountMenu } from './AccountMenu';

type ButtonInfo = {
  label: string;
  link: string;
};

type CustomAppBarProps = {
  buttons: ButtonInfo[];
  user: UserResponseData;
};

const CustomNavBar: React.FC<CustomAppBarProps> = ({ buttons, user }) => {
  const router = useRouter();

  return (
    <AppBar className="nav-bar__user-page" position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <EchoBoardLogo />
        </Box>
        <Stack direction="row" spacing={2}>
          {buttons.map((button, index) => (
            <Button key={index} color="inherit" onClick={() => router.push(button.link)}>
              {button.label}
            </Button>
          ))}
          <AccountMenu {...user} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavBar;
