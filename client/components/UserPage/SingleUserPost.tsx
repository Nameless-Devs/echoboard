import { timeConverter } from '@/service/TimeConverter'
import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Avatar, Typography } from '@mui/material'
import React from 'react'

type SingleUserPostProps = { 
    echoBoard: EchoBoardResponseData;
    user: UserResponseData;
}

export const SingleUserPost: React.FC<SingleUserPostProps> = ({
    echoBoard,
    user
}) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Avatar src={echoBoard.anonymous ? " " : user.picture} />
                <Box>
                    <Typography variant="subtitle1" style={{ marginBottom: "-5px" }}>
                        {echoBoard.anonymous ? "Anonymous" : user.name}
                    </Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>
                        {timeConverter(echoBoard.created)}
                    </Typography>
                </Box>
            </Box>
            <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ margin: "10px 0px 4px" }}
            >
                {echoBoard.title}
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                style={{ margin: "0px" }}
            >
                {echoBoard.content}
            </Typography>
        </>
    )
}
