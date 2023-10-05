import React from "react";
import { EchoBoardResponseData } from "@/service/Types";
import Typography from "@mui/material/Typography";

export const SinglePost: React.FC<EchoBoardResponseData> = ({
  id,
  title,
  author,
  content,
  anonymous,
  upvote,
  echoBoardComment: comments,
}) => {
  return (
    <>
      <Typography variant="subtitle2"></Typography>
        <h4>{anonymous ? "Anonymous" : author}</h4>
      <Typography gutterBottom variant="h5" component="div">
         {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <p>{content}</p>
      </Typography>
    </>
  );
};
