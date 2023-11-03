import React from 'react';
import EchoLogoWhite from "../image/EchoBoard_logo_white.png";
import Image from "next/image";
import { Typography } from '@mui/material';

export default function EchoBoardLogo() {
    return (
        <>
            <Image
                src={EchoLogoWhite}
                alt="EchoBoard logo white"
                width={40}
                style={{
                    margin: "0 1rem",
                }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'flex' },
                    fontFamily: 'popins',
                    fontWeight: 800,
                    letterSpacing: '.2rem',
                    color: 'white',
                    textDecoration: 'none',
                }}
            >
                EchoBoard
            </Typography>
        </>
    )
}
