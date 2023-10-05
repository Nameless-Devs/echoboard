import React from "react";
import { EchoBoardResponseData } from "@/service/Types";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";

export const SinglePost: React.FC<EchoBoardResponseData> = ({
  id,
  title,
  author,
  content,
  anonymous,
  upvote,
  created,
  echoBoardComment: comments,
}) => {
  return (
    <>
      <Box>
        <Avatar />
        <Box>
          <Typography variant="subtitle1">
            {anonymous ? "Anonymous" : author}
          </Typography>
          <Typography variant="caption">
            {created}
          </Typography>
        </Box>
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        <p>{content}</p>
      </Typography>
    </>
  );
};
