import { SolutionResponseData, UserResponseData } from '@/service/Types'
import { Avatar, Box, Grid, ListItem, Typography } from '@mui/material';
import React from 'react'
import UpvoteButton from '../../UpvoteButton';
import { timeConverter } from '@/service/TimeConverter';
import { SolutionStatusBadge } from '@/components/CommentModal/commentModalComponents/SolutionStatusBadge';
import { useQuery } from '@tanstack/react-query';
import { fetchSolutionById } from '@/service/Functions';

type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
    user?: UserResponseData;
}

export const SolutionItemUserPage: React.FC<SolutionItemProps> = ({ solution, onUpvote, user }) => {
   
    // const { data: solutionExtended, isLoading, isError } = useQuery<SolutionResponseData>(
    //     ["echoBoards", solution.id],
    //     async () => {
    //         return await fetchSolutionById(solution.id);
    //     }
    // );

    return (
        <ListItem sx={{padding: 0}}>
            <Grid 
                container sx={{
                border: "solid black 1px",
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "1rem",
                backgroundColor: "white",
            }}>
                <Grid item xs={12} md='auto'>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Typography>to:</Typography>
                        <Avatar sx={{ margin: "0 0.5rem", width: 24, height: 24 }}></Avatar>
                        <Typography sx={{ mr: "0.5rem" }}>John Doe's problem</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md='auto' >
                    <Typography>"Title of the problem which is "</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "-0.5rem" }}>
                    <Typography variant="caption" color="textSecondary">
                        {timeConverter(solution.created)}
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                        {solution.content}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <UpvoteButton count={solution.upvote.length} onUpvote={() => onUpvote(solution.id)} />
                </Grid>
            </Grid>
        </ListItem>
    )
}
