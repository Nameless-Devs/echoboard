import { EchoBoardPreviewResponseData, EchoBoardResponseData, SolutionResponseData, UserResponseData } from '@/service/Types'
import { Box, Grid, ListItem, Typography } from '@mui/material';
import React from 'react'
import UpvoteButton from '../../UpvoteButton';
import { timeConverter } from '@/service/TimeConverter';
import { SolutionStatusBadge } from '@/components/CommentModal/commentModalComponents/SolutionStatusBadge';
import { useQuery } from '@tanstack/react-query';
import { fetchEchoBoardById, fetchEchoBoardBySolutionId } from '@/service/Functions';
import { EchoBoardPreviewDisplay } from './EchoBoardPreviewDisplay';


type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
}

export const SolutionItemUserPage: React.FC<SolutionItemProps> = ({ solution, onUpvote }) => {

    const { data: echoBoardPreview, isLoading, isError } = useQuery<EchoBoardPreviewResponseData>(
        ["echoBoards", solution.id],
        async () => {
            return await fetchEchoBoardBySolutionId(solution.id);
        }
    );

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
                }}>
                <EchoBoardPreviewDisplay isLoading={isLoading} data={echoBoardPreview} />
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
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
                    <UpvoteButton count={solution.upvote.length} onUpvote={() => onUpvote(solution.id)} />
                </Grid>
            </Grid>
        </ListItem>
    )
}
