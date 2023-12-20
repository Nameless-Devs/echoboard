import { Box, Typography } from '@mui/material'
import React from 'react'

export const ChatRoomTextInfo = () => {
    return (
        <Box
            sx={{
                padding: "1rem",
                textAlign: "center"
            }}>
            <Typography variant="subtitle1" color="textSecondary" mb={"1rem"} >
                You have not been assigned to any chatrooms so far.
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                In order to get an access to a chat room, sign up as a volunteer and get accepted for solution testing.
            </Typography>
        </Box>
    )
}
