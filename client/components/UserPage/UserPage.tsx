import { UserResponseData } from '@/service/Types'
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'

type UserPageProps = {
    user: UserResponseData;
}
export const UserPage: React.FC<UserPageProps> = ({ user }) => {
    return (
        <>
            <Box>
                <Typography variant="h3" color="textPrimary">
                    {user.name}
                </Typography>
                <Avatar src={user.picture} style={{ }} />
            </Box>
        </>
    )
}
