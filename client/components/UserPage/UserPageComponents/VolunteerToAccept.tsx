import { UserResponseData } from '@/service/Types';
import { Box, Avatar, Typography, Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type VolunteerToAcceptProps = {
    volunteer: UserResponseData;
}

export const VolunteerToAccept: React.FC<VolunteerToAcceptProps> = ({
    volunteer,
}) => {
    return (
        <Box
            sx={{

                backgroundColor: "rgb(247, 246, 246)",
                margin: "10px",
                borderRadius: "30px",
                maxWidth: "98%",
                padding: "0.7rem",
            }}
        >
            <Grid container alignItems="center">
                <Grid item xs={2} md={1}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Avatar src={volunteer.picture} alt={volunteer.name + " profile picture"} />
                    </Box>
                </Grid>
                <Grid item xs={7} md={9}>
                    <Typography variant="h6" >
                        {volunteer.name}
                    </Typography>
                </Grid>
                <Grid item xs={3} md={2}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <IconButton color='success'>
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton color='error'>
                            <CancelIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}
