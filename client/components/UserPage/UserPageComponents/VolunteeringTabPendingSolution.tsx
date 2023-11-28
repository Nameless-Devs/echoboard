import { SolutionStatusBadge } from '@/components/CommentModal/commentModalComponents/SolutionStatusBadge'
import { fetchEchoBoardBySolutionId } from '@/service/Functions'
import { ListItem, Grid, Box, Avatar, Typography } from '@mui/material'
import React from 'react'
import { EchoBoardPreviewDisplay } from './EchoBoardPreviewDisplay'
import { useQuery } from '@tanstack/react-query'
import { EchoBoardPreviewResponseData, SolutionResponseData } from '@/service/Types'
import UpvoteButton from '@/components/UpvoteButton'
import { timeConverter } from '@/service/TimeConverter'
import { ItemHeader } from '@/components/CommentModal/commentModalComponents/ItemHeader'
import { ItemContent } from '@/components/CommentModal/commentModalComponents/ItemContent'

type VolunteeringTabPendingSolutionProp = {
    solution: SolutionResponseData;
}


export const VolunteeringTabPendingSolution: React.FC<VolunteeringTabPendingSolutionProp> = ({
    solution
}) => {

    const onUpvote = () => {

    }

    const {
        data: echoBoardPreview,
        isLoading: previewLoading,
        isError: previewError,
    } = useQuery<EchoBoardPreviewResponseData>(["echoBoards", solution.id], async () => {
        return await fetchEchoBoardBySolutionId(solution.id);
    });

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
                <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Box sx={{ marginLeft: 'auto', width: '100%' }}>
                        <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
                    </Box>
                </Box>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
                <ItemHeader 
                pictureUrl={solution.echoBoardUser.picture}
                userName={solution.echoBoardUser.name}
                created={solution.created}
                />
                <ItemContent
                content={solution.content}
                upvote={solution.upvote.length}
                onUpvote={onUpvote}
                 />
            </Grid>
        </ListItem>
    )
}
