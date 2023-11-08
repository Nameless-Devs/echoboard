import { timeConverter } from '@/service/TimeConverter'
import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Chip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExtraActionsMenu from './ExtraActionsMenu';
import { Upvote } from '@/components/Upvote';
import CommentModal from '@/components/CommentModal/CommentModal';

type SingleUserPostProps = {
    echoBoard: EchoBoardResponseData;
    user: UserResponseData;
}

export const SingleUserPost: React.FC<SingleUserPostProps> = ({
    echoBoard,
    user
}) => {

    const [contentVisible, setContentVisible] = useState(false);
    const [defaultTabIndex, setDefaultTabIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const showContent = () => {
        setContentVisible(true);
    };

    const hideContent = () => {
        setContentVisible(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
      };
    
      const handleClose = () => {
        setIsOpen(false);
      };

    const handleOpenCommentsTab = () => {
        setDefaultTabIndex(0); 
      };
      
      const handleOpenSolutionsTab = () => {
        setDefaultTabIndex(1); 
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
                    width: { xs: "85vw", md: "75vw" },
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h5"
                        component="div"
                        style={{ margin: "0" }}
                    >
                        {echoBoard.title}
                    </Typography>
                    <ExtraActionsMenu echoBoard={echoBoard} />
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
                <Box sx={{ display: { xs: "", md: "flex" }, justifyContent: "space-between" }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
                        <Button size="small" onClick={() => {
                            handleOpen();
                            handleOpenCommentsTab();;
                        }}>
                            <ModeCommentIcon /> {echoBoard.echoBoardComments?.length || 0}
                        </Button>
                        <Button size="small" onClick={() => {
                            handleOpen();
                            handleOpenSolutionsTab()
                        }}>
                            <LightbulbIcon /> {echoBoard.echoBoardSolutions?.length || 0}
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <Typography>
                            0 people vounteered for 0 solutions
                        </Typography>
                        <Button>Manage</Button>
                    </Box>
                </Box>
            </Box>
            <CommentModal 
            post={echoBoard}
            handleClose={handleClose}
            isOpen={isOpen}
            user={user}
            defaultTabIndex={defaultTabIndex}
            />
        </>
    )
}
