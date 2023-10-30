import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const About = () => {
    return (
        <>
            <Box sx={{
                height: "50vh",
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
                        <Box></Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box></Box>
                    </Grid>
                </Grid>

            </Box>

        </>
    )
}
