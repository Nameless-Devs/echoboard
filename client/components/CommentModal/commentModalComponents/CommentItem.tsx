import { CommentResponseData, UserResponseData } from "@/service/Types";
import { Grid, ListItem } from "@mui/material";
import React from "react";
import { ItemContent } from "./ItemContent";
import { ItemHeader } from "./ItemHeader";
import { PostComment } from "@/components/PostComment/PostComment";
import { PostCommentOnComment } from "@/components/PostComment/PostCommentOnComment";

type CommentItemProps = {
  comment: CommentResponseData;
  onUpvote: () => void;
  user: UserResponseData;
};

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onUpvote, user }) => {

    return (
        <ListItem className="comment-display__individual-comment">
             <Grid container sx={{marginTop: "1rem"}}>
                <ItemHeader
                    pictureUrl={comment.echoBoardUser.picture}
                    userName={comment.echoBoardUser.name}
                    created={comment.created}
                />
                <ItemContent
                    content={comment.content}
                    upvote={comment.upvote.length}
                    onUpvote={onUpvote}
                />
                <PostCommentOnComment echoBoardId={comment.id} user={user} />
                {comment.echoBoardComments && comment.echoBoardComments.length > 0 && (
                    <div className='nested-comments'>
                        {comment.echoBoardComments.map((childComment) => (
                            <CommentItem key={childComment.id} comment={childComment} onUpvote={onUpvote} user={user} />
                        ))}
                    </div>
                )}
            </Grid>
        </ListItem>
    )
}
