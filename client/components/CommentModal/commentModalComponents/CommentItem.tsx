import { CommentResponseData } from '@/service/Types'
import { Grid, ListItem } from '@mui/material'
import React from 'react'
import { ItemContent } from './ItemContent'
import { ItemHeader } from './ItemHeader'

type CommentItemProps = {
    comment: CommentResponseData,
    onUpvote: () => void,
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onUpvote }) => {

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
                    id={comment.id}
                />
            </Grid>
        </ListItem>
    )
}
