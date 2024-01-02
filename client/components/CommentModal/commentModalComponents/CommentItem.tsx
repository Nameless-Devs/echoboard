import { CommentResponseData, UserResponseData } from "@/service/Types";
import { Box, Button, Grid, ListItem } from "@mui/material";
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
        <Button
          sx={{ padding: 0, minWidth: 0, margin: "0.5rem 0 1rem 0" }}
          onClick={() => setIsVisibleInput(!isVisibleInput)}><ReplyIcon /></Button>
        {comment.echoBoardComments && comment.echoBoardComments.length > 0 &&
          <Button
            sx={{ padding: 0, minWidth: 0, margin: "0.5rem 0 1rem 2rem" }}
            onClick={() => setIsVisibleInputCommentReplies(!isVisibleCommentReplies)}>
            {isVisibleCommentReplies ? "hide " : "show "}replies</Button>}
        {isVisibleInput &&
          <Box sx={{ width: "100%", ml: "2rem",}}>
            <PostCommentOnComment echoBoardId={comment.id} user={user} />
          </Box>
        }
        {comment.echoBoardComments && comment.echoBoardComments.length > 0 && isVisibleCommentReplies && (
          <Box className="nested-comments"
            sx={{
              display: "block",
              width: "100%",
              ml: "2rem",
            }}
          >
            {comment.echoBoardComments.map((childComment) => (
              <CommentItem
                key={childComment.id}
                comment={childComment}
                onUpvote={onUpvote}
                user={user}
              />
            ))}
          </Box>
        )}
      </Grid>
    </ListItem>
  );
};
