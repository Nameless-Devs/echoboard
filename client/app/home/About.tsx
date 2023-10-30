import { Box, Grid, Typography } from '@mui/material';
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
                        <Box>
                            <Typography variant='h6'
                            sx={{color: "white"}}>
                            EchoBoard is a platform designed to address the challenge of effectively sharing and solving problems within the workplace. 
                            It aims to bridge the gap between employees and upper management by providing a platform for employees to voice their concerns, 
                            propose solutions, and collaborate on addressing issues that impact the organisation.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display={{ xs: "none", md: "block" }}>
                            <Image 
                            src={PhonePicture} 
                            alt="Picture of mobile phone with EchoBoard application"
                            // layout="responsive" 
                            width={250}
                            />
                        </Box>
                        <Box display={{ xs: "block", md: "none" }}>
                            <Image 
                            src={PhonePicture} 
                            alt="Picture of mobile phone with EchoBoard application"
                            // layout="responsive" 
                            width={200}
                            />
                        </Box>
                    </Grid>
                </Grid>

            </Box>

        </>
    )
}
