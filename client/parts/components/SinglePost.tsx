import React from "react";
import { EchoBoardResponseData } from "../Types";

export const SinglePost: React.FC<EchoBoardResponseData> = ({
  id,
  title,
  author,
  content,
  upvote,
  echoBoardComments: comments,
}) => {
  return (
    <>
      <h2>{author}</h2>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>comments:{comments?.length}</p>
    </>
  );
};
