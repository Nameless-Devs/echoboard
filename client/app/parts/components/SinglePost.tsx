import React from 'react'
import { EchoBoardResponseData } from '../Types'
import { Upvote } from './Upvote'

export const SinglePost: React.FC<EchoBoardResponseData> = ({ id, title, author, content, upvote, comments}) => {
  return (
    <>
        <h2>{author}</h2>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>upvotes:{upvote}</p>
        <p>comments:{comments.length}</p>
        <Upvote upvote={upvote} echoBoardId={id} />
    </>
  )
}
