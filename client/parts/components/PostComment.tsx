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
        content:""
    });

    const queryClient = useQueryClient();
    const mutation = useMutation((data: CommentToPost) => postComment(data, echoBoardId));

    const handleCommentPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!commentToPost.author.trim() || !commentToPost.content.trim()) {
          return;
        }

        mutation.mutate(commentToPost, {
            onSuccess: () => {
              queryClient.invalidateQueries(["echoBoards"]);
              queryClient.refetchQueries(['comments', echoBoardId]);
              setCommentToPost({
                author: "",
                content: ""
              });
            },
            onError: (error) => {
              console.error("Error:", error);
            },
          });
    }

  return (
    <>
    <form className='post-comment__form' onSubmit={handleCommentPost}>
    <TextField className='post-comment__name-input'
            label="Enter your name"
            variant="outlined"
            name="author"
            size="small"
            value={commentToPost.author}
            onChange={(e) =>
              setCommentToPost({ ...commentToPost, author: e.target.value }) }/>
     <TextField className='post-comment__comment'
            label="Comment"
            variant="outlined"
            name="comment"
            multiline
            rows={2}
            value={commentToPost.content}
            onChange={(e) =>
              setCommentToPost({ ...commentToPost, content: e.target.value }) }/>
    <Button className='post-comment__button' variant="outlined" type="submit">
            Comment
          </Button>
            
    </form>
    </>
  )
}
