import { UserResponseData } from '@/service/Types';
import { Box, Avatar, Typography, Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type VolunteerToAcceptProps = {
    index: number;
    volunteer: UserResponseData;
}

export const VolunteerToAccept: React.FC<VolunteerToAcceptProps> = ({
    index,
    volunteer,
}) => {
    return (
        <Box key={index}>
            <Grid container>
                <Grid item xs={2}>
                    <Avatar src={volunteer.picture} alt={volunteer.name + " profile picture"} />
                </Grid>
                <Grid item xs={7}>
                    <Typography>
                        {volunteer.name}
                    </Typography>
                </Grid>
                <Grid xs={3}>
                    <IconButton color='success'>
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton color='error'>
                        <CancelIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}
