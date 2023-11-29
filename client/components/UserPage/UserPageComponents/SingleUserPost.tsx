import { timeConverter } from '@/service/TimeConverter'
import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Chip, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExtraActionsMenu from './ExtraActionsMenu';
import { Upvote } from '@/components/Upvote';
import CommentModal from '@/components/CommentModal/CommentModal';
import { useQuery } from '@tanstack/react-query';
import { fetchEchoBoardById } from '@/service/Functions';
import { ManageSolutionsWindow } from './ManageSolutionsWindow';

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
    const [isManageSolutonOpen, setIsManageSolutionOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const { data: echoBoardExtended, isLoading, isError } = useQuery<EchoBoardResponseData>(
        ["echoBoardSinglePost", echoBoard.id],
        async () => {
            return await fetchEchoBoardById(echoBoard.id);
        }
    );

    useEffect(() => {
        if (echoBoardExtended) {
          setIsDisabled(echoBoardExtended.echoBoardSolutions === null || echoBoardExtended.echoBoardSolutions.length === 0);
        }
      }, [echoBoardExtended]);

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

    const handleOpenManageSolutionsWindow = () => {
        setIsManageSolutionOpen(true);
    };

    const handleClsoeManageSolutionsWindow = () => {
        setIsManageSolutionOpen(false);
    };

    return (
        <>
            {isLoading && <Box
                sx={{
                    border: "solid black 1px",
                    padding: "1rem",
                    margin: "1rem 0",
                    borderRadius: "1rem",
                    backgroundColor: "white",
                    width: { xs: "90vw", md: "75vw" },
                    height: { xs: "10rem", md: "8rem" },
                }}>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={30} width={150} />
            </Box>}
            {echoBoardExtended &&
                <>
                    <Box
                        sx={{
                            border: "solid black 1px",
                            padding: "1rem",
                            margin: "1rem 0",
                            borderRadius: "1rem",
                            backgroundColor: "white",
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
                            {echoBoard.anonymous && <Chip label="Posted anonymously" size='small' />}
                        </Box>
                        <Typography variant="caption" style={{ color: "gray" }}>
                            {timeConverter(echoBoard.created)}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            style={{ margin: "0px" }}
                        >
                            {contentVisible && echoBoard.content}
                        </Typography>
                        <Box>
                            {contentVisible ? (
                                <Button size='small' onClick={hideContent}>Hide Content</Button>
                            ) : (
                                <Button size='small' onClick={showContent}>Show Content</Button>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: "", md: "flex" }, justifyContent: "space-between" }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Upvote upvote={echoBoardExtended.upvote} echoBoardId={echoBoardExtended.id} />

                                <Button size="small" onClick={() => {
                                    handleOpen();
                                    handleOpenCommentsTab();;
                                }}>
                                    <ModeCommentIcon /> {echoBoardExtended.echoBoardComments.length || 0}
                                </Button>
                                <Button size="small" onClick={() => {
                                    handleOpen();
                                    handleOpenSolutionsTab()
                                }}>
                                    <LightbulbIcon /> {echoBoardExtended.echoBoardSolutions?.length || 0}
                                </Button>

                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                                {echoBoardExtended.echoBoardSolutions.length === 1 ? (
                                    <Typography>
                                        {echoBoardExtended.echoBoardSolutions?.length} solution suggested
                                    </Typography>
                                ) : (
                                    <Typography>
                                        {echoBoardExtended.echoBoardSolutions?.length} solutions suggested
                                    </Typography>
                                )}
                                <Button 
                                disabled={isDisabled}
                                onClick={handleOpenManageSolutionsWindow} 
                                variant="outlined" 
                                sx={{ ml: "1rem" }}>
                                    Manage
                                    </Button>
                            </Box>
                        </Box>
                    </Box>
                    <CommentModal
                        post={echoBoardExtended}
                        handleClose={handleClose}
                        isOpen={isOpen}
                        user={user}
                        defaultTabIndex={defaultTabIndex}
                    />
                    <ManageSolutionsWindow
                        open={isManageSolutonOpen}
                        onClose={handleClsoeManageSolutionsWindow}
                        echoBoard={echoBoardExtended}
                        user={user} />
                </>
            }
        </>
    )
}
