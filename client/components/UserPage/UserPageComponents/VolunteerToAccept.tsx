import { UserResponseData } from '@/service/Types';
import { Box, Avatar, Typography, Button, Grid } from '@mui/material'
import React from 'react'

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
                    <Button color='success' variant='contained'>Accept</Button>
                    <Button color='error' variant='contained'>Deny</Button>
                </Grid>
            </Grid>
            {/* 
            <Avatar src={volunteer.picture} alt={volunteer.name + " profile picture"} />
            <Typography>
                {volunteer.name}
            </Typography>
            <Button color='success' variant='contained'>Accept</Button>
            <Button color='error' variant='contained'>Deny</Button> */}
        </Box>
    )
}
