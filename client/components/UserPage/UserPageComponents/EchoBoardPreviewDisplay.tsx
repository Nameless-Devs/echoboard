import React from "react";
import { Avatar, Box, Grid, Skeleton, Typography } from "@mui/material";
import { EchoBoardPreviewResponseData } from "@/service/Types";

type EchoBoardPreviewDisplayProps = {
  isLoading: boolean;
  data: EchoBoardPreviewResponseData | undefined;
};

export const EchoBoardPreviewDisplay: React.FC<
  EchoBoardPreviewDisplayProps
> = ({ isLoading, data }) => (
  <>
  <Grid container>
    <Grid item xs={12} md="auto">
      {isLoading ? (
        <Skeleton variant="rectangular" width={200} height={24} />
      ) : (
        data && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography color="textSecondary">to:</Typography>
            <Avatar
              src={data.echoBoardUser?.picture}
              alt={data.echoBoardUser?.name + " avatar picture"}
              sx={{ margin: "0 0.5rem", width: 24, height: 24 }}
            />
            <Typography color="textSecondary" sx={{ mr: "0.5rem" }}>
              {data.echoBoardUser?.name}&rsquo;s problem
            </Typography>
          </Box>
        )
      )}
    </Grid>
    <Grid item xs={12} md="auto">
      {isLoading ? (
        <Skeleton variant="rectangular" width={150} height={24} />
      ) : (
        data && (
          <Typography color="textSecondary">
            &quot;{data?.title}&quot;
          </Typography>
        )
      )}
    </Grid>
    </Grid>
  </>
);
