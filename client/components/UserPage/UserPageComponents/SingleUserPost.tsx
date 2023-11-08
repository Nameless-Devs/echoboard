import { timeConverter } from '@/service/TimeConverter'
import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Chip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExtraActionsMenu from './ExtraActionsMenu';
import { Upvote } from '@/components/Upvote';

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
            <Box
                sx={{
                    border: "solid black 1px",
                    padding: "1rem",
                    margin: "1rem 0",
                    borderRadius: "1rem",
                    backgroundColor: "white",
                    width: { xs: "85vw", md: "75vw"},
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h5"
                        component="div"
                        style={{ margin: "0" }}
                    >
                        {echoBoard.title}
                    </Typography>
                    <ExtraActionsMenu  echoBoard={echoBoard}/>
                </Box>
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
                <Box sx={{display: {xs: "", md: "flex"}, justifyContent: "space-between"}}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        color: "#3874cb",

                    }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ModeCommentIcon color='primary' /> {echoBoard.echoBoardComments?.length || 0}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LightbulbIcon color='primary' /> {echoBoard.echoBoardSolutions?.length || 0}
                        </Box>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <Typography>
                            0 people vounteered for 0 solutions
                        </Typography>
                        <Button>Manage</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
