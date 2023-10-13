import { CommentResponseData } from '@/service/Types';
import { List } from '@mui/material';
import React from 'react'
import { CommentItem } from './CommentItem';

type CommentsListProps = {
    comments: CommentResponseData[];
    onCommentUpvote: (commentId: string) => void;
  }

export const CommentsList: React.FC<CommentsListProps> = ({ comments, onCommentUpvote }) => {
    
  return (
    <List>
    {comments
      .sort((a, b) => b.upvote.length - a.upvote.length)
      .map((comment, index) => (
        <CommentItem
          key={index}
          comment={comment}
          onUpvote={() => onCommentUpvote(comment.id)}
        />
      ))}
  </List>
  )
}
