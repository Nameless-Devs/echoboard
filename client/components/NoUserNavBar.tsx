import React from 'react';
import { AppBar, Toolbar, Box, Button, Stack } from '@mui/material';
import { useRouter } from "next/navigation";
import EchoBoardLogo from './EchoBoardLogo';
import { UserResponseData } from '@/service/Types';
import "../app/styles/UserPage.css"
import {ENDPOINTS} from "@/service/config";

type ButtonInfo = {
    label: string;
    link: string;
};

type CustomAppBarProps = {
    buttons: ButtonInfo[];
    user?: UserResponseData;
};


const buttons = [
    {label: 'Starting page', link: '/home'},
    {label: 'Chat', link: '/chatroom'},
    {label: 'LOGIN', link: ENDPOINTS.LOGIN}
];

const NoUserNavBar: React.FC<CustomAppBarProps> = () => {
    const router = useRouter();

    return (
        <AppBar className="nav-bar__user-page" position="static">
            <Toolbar className="tool-bar__user-page">
                <Box sx={{ flexGrow: 1 }}>
                    <EchoBoardLogo />
                </Box>
                <Stack direction="row" spacing={2}>
                    {buttons.map((button, index) => (
                        <Button key={index} color="inherit" onClick={() => router.push(button.link)}>
                            {button.label}
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default NoUserNavBar;
