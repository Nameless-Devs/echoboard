import { Grid, Box, Typography } from '@mui/material'
import React from 'react'
import { ItemHeader } from '../CommentModal/commentModalComponents/ItemHeader'
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
          border: "solid black 1px",
          padding: "1rem",
          margin: "1rem 0",
          borderRadius: "1rem",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ marginLeft: "auto", width: "100%" }}>
            <EchoBoardPreviewDisplay
              isLoading={previewLoading}
              data={echoBoardPreview}
            />
          </Box>
        </Box>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.2rem 0.5rem 0 0 ",
            }}
          >
          </Box>
        </Grid>
        <ItemHeader
          pictureUrl={solution.echoBoardUser.picture}
          userName={solution.echoBoardUser.name}
          created={solution.created}
        />
           <>
      <Grid item xs={2} md={1}></Grid>
      <Grid item xs={10} md={11}>
        <Typography
          variant="body1"
          color="textPrimary"
          sx={{ margin: "0.5rem 2rem 0.5rem 0" }}
        >
          {solution.content}
        </Typography>
      </Grid>
      <Grid item xs={2} md={1}></Grid>
    </>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
          </Box>
        </Grid>
      </Grid>
  )
}
