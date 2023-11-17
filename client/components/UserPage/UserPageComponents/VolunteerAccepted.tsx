import { UserResponseData } from '@/service/Types';
import { Box, Avatar, Typography, Grid } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';

type VolunteerToAcceptProps = {
    volunteer: UserResponseData;
}

export const VolunteerAccepted: React.FC<VolunteerToAcceptProps> = ({
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
                        <CheckIcon color='success' />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}
