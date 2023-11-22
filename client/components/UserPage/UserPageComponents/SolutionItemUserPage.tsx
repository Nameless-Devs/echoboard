import { EchoBoardPreviewResponseData, EchoBoardResponseData, SolutionResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Grid, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react'
import UpvoteButton from '../../UpvoteButton';
import { timeConverter } from '@/service/TimeConverter';
import { SolutionStatusBadge } from '@/components/CommentModal/commentModalComponents/SolutionStatusBadge';
import { useQuery } from '@tanstack/react-query';
import { fetchEchoBoardById, fetchEchoBoardBySolutionId } from '@/service/Functions';
import { EchoBoardPreviewDisplay } from './EchoBoardPreviewDisplay';
import CommentModal from '@/components/CommentModal/CommentModal';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";


type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
    user: UserResponseData;
}

export const SolutionItemUserPage: React.FC<SolutionItemProps> = ({ solution, onUpvote, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultTabIndex = 1;

    const {
        data: echoBoardPreview,
        isLoading: previewLoading,
        isError: previewError,
    } = useQuery<EchoBoardPreviewResponseData>(["echoBoards", solution.id], async () => {
        return await fetchEchoBoardBySolutionId(solution.id);
    });

    const {
        data: echoBoardExtended,
        isLoading: extendedLoading,
        isError: extendedError,
    } = useQuery<EchoBoardResponseData>(
        ["echoBoards", echoBoardPreview?.id],
        async () => {
            return await fetchEchoBoardById(echoBoardPreview?.id || '');
        },
        {
            enabled: !!echoBoardPreview?.id,
        }
    );

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ListItem sx={{ padding: 0 }}>
            <Grid
                container sx={{
                    border: "solid black 1px",
                    padding: "1rem",
                    margin: "1rem 0",
                    borderRadius: "1rem",
                    backgroundColor: "white",
                }}

            >
                <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
                <Box sx={{
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    transition: 'box-shadow 0.3s',
                    padding: "0 0.5rem",
                    '&:hover': {
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;', 
                    },
                }}
                    onClick={() => setIsOpen(true)} >
                    <Grid item xs={12} >
                        <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                            {solution.content}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "-0.4rem" }}>
                        <Typography variant="caption" color="textSecondary">
                            {timeConverter(solution.created)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>   
                    <Button sx={{
                        padding: 0, 
                        minWidth: 0, 
                        margin: "0.5rem 0 1rem 0",
                        '&:hover': { backgroundColor: 'transparent' },
                        }}>
                        <ThumbUpIcon /> {solution.upvote.length}
                        </Button >     
                    </Grid>
                </Box>
            </Grid>
            {echoBoardExtended && <CommentModal
                post={echoBoardExtended}
                handleClose={handleClose}
                isOpen={isOpen}
                user={user}
                defaultTabIndex={defaultTabIndex}
            />}
        </ListItem>
    )
}
