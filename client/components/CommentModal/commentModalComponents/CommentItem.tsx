import { CommentResponseData, UserResponseData } from "@/service/Types";
import { Button, Grid, ListItem } from "@mui/material";
import React, { useState } from "react";
import { ItemContent } from "./ItemContent";
import { ItemHeader } from "./ItemHeader";
import { PostCommentOnComment } from "@/components/PostComment/PostCommentOnComment";
import ReplyIcon from '@mui/icons-material/Reply';

type CommentItemProps = {
  comment: CommentResponseData;
  onUpvote: () => void;
  user: UserResponseData;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onUpvote,
  user,
}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const [isVisibleCommentReplies, setIsVisibleInputCommentReplies] = useState(false);

  return (
    <ListItem className="comment-display__individual-comment">
      <Grid container sx={{ marginTop: "1rem" }}>
        <ItemHeader
          pictureUrl={comment.echoBoardUser.picture}
          userName={comment.echoBoardUser.name}
          created={comment.created}
        />
        <ItemContent
          content={comment.content}
          upvote={comment.upvote.length}
          onUpvote={onUpvote}
          id={comment.id}
        />
        <Button onClick={() => setIsVisibleInput(!isVisibleInput)}><ReplyIcon /></Button>
        {comment.echoBoardComments && comment.echoBoardComments.length > 0 && <Button onClick={() => setIsVisibleInputCommentReplies(!isVisibleCommentReplies)}>
          {isVisibleCommentReplies ? "hide " : "show "}replies</Button>}
        {isVisibleInput && <PostCommentOnComment echoBoardId={comment.id} user={user} />}
        {comment.echoBoardComments && comment.echoBoardComments.length > 0 && isVisibleCommentReplies && (
          <div className="nested-comments">
            {comment.echoBoardComments.map((childComment) => (
              <CommentItem
                key={childComment.id}
                comment={childComment}
                onUpvote={onUpvote}
                user={user}
              />
            ))}
          </div>
        )}
      </Grid>
    </ListItem>
  );
};
