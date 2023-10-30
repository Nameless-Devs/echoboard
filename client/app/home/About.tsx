import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import PhonePicture from "../image/Phone_example.png";
import Image from "next/image";


export const About = () => {
    return (
        <>
            <Box sx={{
                background: "linear-gradient(135deg, hsla(215, 91%, 18%, 1) 2%, hsla(187, 61%, 28%, 1) 100%)"
            }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        padding: '2rem 0',
                        fontSize: { md: '2.5rem' },
                        color: "white",
                    }}
                >
                    About
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box 
                        display={'flex'} 
                        flexDirection={"column"}
                        sx={{
                            textAlign: "left",
                            margin: { xs: "0 1.5rem", md: "0 0 0 3rem"},
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                    
                        }}>
                            <Typography variant='h6'
                                sx={{ 
                                    color: "white",
                        
                                     }}>
                                EchoBoard is a platform designed to address the challenge of effectively sharing and solving problems within the workplace.
                            </Typography>
                            <Typography variant='h6'
                                sx={{ 
                                    color: "white",
                                    marginTop: "1.5rem",
                                     }}>
                                It aims to bridge the gap between employees and upper management by providing a platform for employees to voice their concerns,
                                propose solutions, and collaborate on addressing issues that impact the organisation.
                            </Typography>
                            <Button component="label" variant="contained" sx={{margin: "2rem"}}>
                                Watch video
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display={{ xs: "none", md: "flex" }} justifyContent={"center"}>
                            <Image
                                src={PhonePicture}
                                alt="Picture of mobile phone with EchoBoard application"
                                width={250}
                                style={{
                                    marginBottom: "5rem"
                                }}
                            />
                        </Box>
                        <Box display={{ xs: "flex", md: "none" }} justifyContent={"center"}>
                            <Image
                                src={PhonePicture}
                                alt="Picture of mobile phone with EchoBoard application"
                                width={200}
                                style={{
                                    marginBottom: "3rem"
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

            </Box>

        </>
    )
}
