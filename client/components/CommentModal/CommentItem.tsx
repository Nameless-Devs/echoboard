import { CommentResponseData } from '@/service/Types'
import React from 'react'

type CommentItemProps = {
comment: CommentResponseData,
onUpvote: () => void,
}

export const CommentItem: React.FC <CommentItemProps> = ({ comment, onUpvote }) => {
    
  return (
    <div>CommentItem</div>
  )
}
