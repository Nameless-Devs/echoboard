"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EchoLogoWhite from "../image/EchoBoard_logo_white.png"
import Image from "next/image";
import Link from 'next/link';
import { ENDPOINTS } from '@/service/config';

const pages = ['Home', 'Features', 'About', 'Contact'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position='static' sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link href={`#${page.toLowerCase()}`} style={{ color: "black", textDecoration: "none" }}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                            <MenuItem>
                                <Link href={ENDPOINTS.LOGIN} style={{ color: "black", textDecoration: "none" }}>
                                    <Button
                                        variant="text"
                                        style={{
                                            alignSelf: "center",
                                            borderColor: "black"
                                        }}>
                                        Log in
                                    </Button>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {pages.map((page) => (
                            <Link href={`#${page.toLowerCase()}`} style={{ color: "white", textDecoration: "none" }}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                        <Link href={ENDPOINTS.LOGIN} style={{ textDecoration: "none", alignSelf: "center", }}>
                            <Button
                                variant="outlined"
                                style={{
                                    borderColor: "white",
                                    color: "white"
                                }}>
                                Log in
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
