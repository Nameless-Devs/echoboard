import React, { useState } from 'react'
import { CommentToPost } from '../Types';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentProps = {
    echoBoardId: string; 
}

export const PostComment: React.FC<CommentProps> = ({ echoBoardId }) => {
    const [commentToPost, setCommentToPost] = useState<CommentToPost>({
        author: "", 
        comment:""
    });

    const queryClient = useQueryClient();

    const mutation = useMutation(postComment);

    const handleCommentPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

  return (
    <>
    <form onSubmit={handleCommentPost}>
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
