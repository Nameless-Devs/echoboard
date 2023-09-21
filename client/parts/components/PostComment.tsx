import React, { useState } from 'react'
import { CommentToPost } from '../Types';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from '../Functions';

type CommentProps = {
    echoBoardId: string; 
}

export const PostComment: React.FC<CommentProps> = ({ echoBoardId }) => {
    const [commentToPost, setCommentToPost] = useState<CommentToPost>({
        author: "", 
        comment:""
    });

    const queryClient = useQueryClient();
    const mutation = useMutation((data: CommentToPost) => postComment(data, echoBoardId));

    const handleCommentPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutation.mutate(commentToPost, {
            onSuccess: () => {
              queryClient.invalidateQueries(["comment"]);
              setCommentToPost({
                author: "",
                comment: ""
              });
            },
            onError: (error) => {
              console.error("Error:", error);
            },
          });
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
