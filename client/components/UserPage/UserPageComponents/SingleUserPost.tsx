import { timeConverter } from '@/service/TimeConverter'
import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Chip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExtraActionsMenu from './ExtraActionsMenu';

type SingleUserPostProps = {
    echoBoard: EchoBoardResponseData;
    user: UserResponseData;
}

export const SingleUserPost: React.FC<SingleUserPostProps> = ({
    echoBoard,
    user
}) => {

    const [contentVisible, setContentVisible] = useState(false);

    const showContent = () => {
        setContentVisible(true);
    };

    const hideContent = () => {
        setContentVisible(false);
    };
    return (
        <>
            <Box sx={{ border: "solid black 1px" }}>
                <ExtraActionsMenu />
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ margin: "10px 0px 4px" }}
                >
                    {echoBoard.title}
                </Typography>
                <Box>
                    {echoBoard.anonymous ? <Chip label="Posted anonymously" size='small' /> : ''}
                </Box>
                <Typography variant="caption" style={{ color: "gray" }}>
                    {timeConverter(echoBoard.created)}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    style={{ margin: "0px" }}
                >
                    {contentVisible ? echoBoard.content : ''}
                </Typography>
                <div>
                    {contentVisible ? (
                        <Button size='small' onClick={hideContent}>Hide Content</Button>
                    ) : (
                        <Button size='small' onClick={showContent}>Show Content</Button>
                    )}
                </div>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    color: "#3874cb",

                }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ThumbUpIcon color='primary' /> {echoBoard.upvote?.length}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ModeCommentIcon color='primary' /> {echoBoard.echoBoardComments?.length || 0}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LightbulbIcon color='primary' /> {echoBoard.echoBoardSolutions?.length || 0}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
