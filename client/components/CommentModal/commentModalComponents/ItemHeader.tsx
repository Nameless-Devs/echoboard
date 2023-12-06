import { timeConverter } from "@/service/TimeConverter";
import { Grid, Box, Avatar, Typography } from "@mui/material";
import React from "react";

type ItemHeaderProps = {
  pictureUrl: string;
  userName: string;
  created: string;
};

export const ItemHeader: React.FC<ItemHeaderProps> = ({
  pictureUrl,
  userName,
  created,
}) => {
  return (
    <>
      <Grid item xs={2} md={1} sx={{ marginTop: "-0.5rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar src={pictureUrl} />
        </Box>
      </Grid>
      <Grid item xs={10} md={11} sx={{ marginTop: "-0.5rem" }}>
        <Typography sx={{ marginBottom: "-0.4rem" }}>{userName}</Typography>
        <Typography variant="caption" color="textSecondary">
          {timeConverter(created)}
        </Typography>
      </Grid>
    </>
  );
};
