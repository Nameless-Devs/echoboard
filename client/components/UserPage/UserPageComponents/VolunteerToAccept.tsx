import { UserResponseData } from '@/service/Types';
import { Box, Avatar, Typography, Button } from '@mui/material'
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
            <Avatar src={volunteer.picture} alt={volunteer.name + " profile picture"} />
            <Typography>
                {volunteer.name}
            </Typography>
            <Button color='success' variant='contained'>Accept</Button>
            <Button color='error' variant='contained'>Deny</Button>
        </Box>
    )
}
