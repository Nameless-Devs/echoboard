import React from 'react';
import EchoLogoWhite from "../app/image/EchoBoard_logo_white.png";
import Image from "next/image";
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function EchoBoardLogo() {
    return (
        <Link href={"/"} style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
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
                    component="span"
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
            </Box>
        </Link>
    )
}
