import React from "react";
import { EchoBoardResponseData } from "../Types";
import Typography from "@mui/material/Typography";

export const SinglePost: React.FC<EchoBoardResponseData> = ({
  id,
  title,
  author,
  content,
  upvote,
  echoBoardComment: comments,
}) => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        <h3>{title}</h3>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <p>{content}</p>
        <h4>{author}</h4>
      </Typography>
    </>
  );
};
