import { Box, Typography } from '@mui/material'
import React from 'react'

export const ChatPageTextInfo = () => {
    return (
        <Box sx={{
            textAlign: "center",
            padding: "2rem 1rem",
        }}>
            <Typography variant="h6" color="textSecondary">
                Welcom to the Chat page where you can discuss the solution implementations with your fellow volunteers.
            </Typography>
            <Typography variant="h6" color="textSecondary">
                Select the chat room and start talking!
            </Typography>
        </Box>
    )
}
