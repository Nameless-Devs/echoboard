import React, { useState } from 'react'
import { CommentToPost } from '../Types';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from '../Functions';
import "../../app/styles/PostCommentStyles.css"

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

        if (!commentToPost.author.trim() || !commentToPost.comment.trim()) {
          return;
        }

        mutation.mutate(commentToPost, {
            onSuccess: () => {
              queryClient.invalidateQueries(["echoBoards"]);
              queryClient.refetchQueries(['comments', echoBoardId]);
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
    <TextField className='post-comment__name-input'
            label="Enter your name"
            variant="outlined"
            name="author"
            size="small"
            style = {{width: 300}} 
            value={commentToPost.author}
            onChange={(e) =>
              setCommentToPost({ ...commentToPost, author: e.target.value }) }/>
     <TextField
            label="comment"
            variant="outlined"
            name="comment"
            multiline
            rows={2}
            maxRows={4}
            style = {{width: 300}} 
            margin='normal'
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
