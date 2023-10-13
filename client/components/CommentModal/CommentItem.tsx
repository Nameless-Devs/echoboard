import { CommentResponseData } from '@/service/Types'
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import UpvoteButton from '../UpvoteButton'

type CommentItemProps = {
    comment: CommentResponseData,
    onUpvote: () => void,
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onUpvote }) => {

    return (
        <ListItem className="comment-display__individual-comment">
            <Avatar src={comment.echoBoardUser.picture} style={{ marginRight: "15px" }} />
            <ListItemText
                primary={
                    <Typography variant="body2" color="textSecondary">
                        {comment.echoBoardUser.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body1" color="textPrimary">
                        {comment.content}
                    </Typography>
                }
            ></ListItemText>
            <UpvoteButton count={comment.upvote.length} onUpvote={onUpvote} />
        </ListItem>
    )
}
