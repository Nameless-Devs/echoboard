import { SolutionResponseData, UserResponseData } from '@/service/Types'
import { Avatar, Box, Grid, ListItem, Typography } from '@mui/material';
import React from 'react'
import UpvoteButton from '../../UpvoteButton';
import { SolutionStatusBadge } from './SolutionStatusBadge';
import { timeConverter } from '@/service/TimeConverter';

type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
    user?: UserResponseData;
}

export const SolutionItem: React.FC<SolutionItemProps> = ({ solution, onUpvote, user }) => {

    return (
        <ListItem className="comment-display__individual-comment">
           
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
                <Grid item xs={2} md={1} sx={{marginTop: "-0.5rem"}}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Avatar src={solution.echoBoardUser.picture} />
                    </Box>
                </Grid>
                <Grid item xs={10} md={11} sx={{marginTop: "-0.5rem"}}>
                    <Typography sx={{ marginBottom: "-0.4rem" }}>
                        {solution.echoBoardUser.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {timeConverter(solution.created)}
                    </Typography>
                </Grid>
                <Grid item xs={2} md={1}></Grid>
                <Grid item xs={10} md={11}>
                    <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                        {solution.content}
                    </Typography>
                </Grid>
                <Grid item xs={2} md={1}></Grid>
                <Grid item xs={2} md={1}>
                    <UpvoteButton count={solution.upvote.length} onUpvote={() => onUpvote(solution.id)} />
                </Grid>
            </Grid>
        </ListItem>
    )
}
