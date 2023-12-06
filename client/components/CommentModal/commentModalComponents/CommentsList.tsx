import { CommentResponseData, UserResponseData } from "@/service/Types";
import { List } from "@mui/material";
import React from "react";
import { CommentItem } from "./CommentItem";

type CommentsListProps = {
  comments: CommentResponseData[];
  onCommentUpvote: (commentId: string) => void;
  user: UserResponseData;
};

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  onCommentUpvote,
  user,
}) => {
  return (
    <List>
      {comments
        .sort((a, b) => b.upvote.length - a.upvote.length)
        .map((comment, index) => {
          return (
            <CommentItem
              key={index}
              comment={comment}
              onUpvote={() => onCommentUpvote(comment.id)}
              user={user}
            />
          );
        })}
    </List>
  );
};
