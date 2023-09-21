import React, { useState } from 'react'
import { CommentToPost } from '../Types';
import { Button, TextField } from '@mui/material';

export const PostComment = () => {
    const [commentToPost, setCommentToPost] = useState<CommentToPost>({
        author: "", 
        comment:""
    });

  return (
    <>
    <form>
    <TextField
            label="Enter your name"
            variant="outlined"
            name="author"
            value={commentToPost.author}
            onChange={(e) =>
              setCommentToPost({ ...commentToPost, author: e.target.value }) }/>
     <TextField
            label="comment"
            variant="outlined"
            name="comment"
            value={commentToPost.comment}
            onChange={(e) =>
              setCommentToPost({ ...commentToPost, comment: e.target.value }) }/>
    <Button variant="outlined" type="submit">
            Comment
          </Button>
            
    </form>
    </>
  )
}
