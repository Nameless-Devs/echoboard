import { EchoBoardResponseData } from '@/service/Types';
import React from 'react'

type CommentsListProps {
    comments: EchoBoardResponseData[];
    onCommentUpvote: (commentId: string) => void;
  }

export const CommentList = () => {
  return (
    <div>CommentList</div>
  )
}
