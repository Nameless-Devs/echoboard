import { Grid, Box, Typography, Avatar } from '@mui/material'
import React from 'react'
import { EchoBoardPreviewDisplay } from '../UserPage/UserPageComponents/EchoBoardPreviewDisplay'
import { EchoBoardPreviewResponseData, SolutionResponseData } from '@/service/Types'
import { useQuery } from '@tanstack/react-query'
import { fetchEchoBoardBySolutionId } from '@/service/Functions'

type ChatSolutionInfoProps = {
    solution: SolutionResponseData;
}

export const ChatSolutionInfo: React.FC<ChatSolutionInfoProps> = ({ solution }) => {

    const {
        data: echoBoardPreview,
        isLoading: previewLoading,
        isError: previewError,
    } = useQuery<EchoBoardPreviewResponseData>(
        ["echoBoardPreviewChatRoom", solution.id],
        async () => {
            return await fetchEchoBoardBySolutionId(solution.id);
        }
    );

    return (
        <Grid
            container
            sx={{
                borderBottom: "3px solid #c1c4c7",
                padding: "1rem",
                backgroundColor: "white",
            }}
        >
            <Grid item xs={12} sx={{ mb: "1rem"}}>
                <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
            </Grid>
            <Grid item xs={2} md={2} sx={{ marginTop: "-0.5rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                        mr: "1rem",
                    }}
                >
                    <Avatar src={solution.echoBoardUser.picture} />
                </Box>
            </Grid>
            <Grid item xs={10} md={10} >
                <Typography>{solution.echoBoardUser.name}</Typography>
            </Grid>
            <Grid item xs={2} md={2}></Grid>
            <Grid item xs={10} md={10}>
                <Typography
                    variant="body1"
                    color="textPrimary"
                >
                    {solution.content}
                </Typography>
            </Grid>
        </Grid>
    )
}
