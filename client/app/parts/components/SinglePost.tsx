import React from 'react'
import { EchoBoardResponseData } from '../Types'

export const SinglePost: React.FC<EchoBoardResponseData> = ({ title, author, content, upvote, comments}) => {
  return (
    <div>
        <h2>{author}</h2>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>upvotes:{upvote}</p>
        <p>comments:{comments.length}</p>
    </div>
  )
}
