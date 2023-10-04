import React, { useState } from 'react'
import { CommentToPost, UserResponseData } from '../Types';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from '../Functions';
import "../../app/styles/PostCommentStyles.css"
import { useCookies } from 'react-cookie';

type CommentProps = {
  echoBoardId: string;
  user: UserResponseData;
}

export const PostComment: React.FC<CommentProps> = ({ echoBoardId, user }) => {
  const [commentToPost, setCommentToPost] = useState<CommentToPost>({
    author: user.name,
    content: ""
  });

  const [cookies] = useCookies();

  const queryClient = useQueryClient();
  const mutation = useMutation((data: CommentToPost) => postComment(data, echoBoardId, cookies.JwtToken));

  const handleCommentPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!commentToPost.content.trim()) {
      return;
    }

    mutation.mutate(commentToPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.refetchQueries(['comments', echoBoardId]);
        setCommentToPost({
          author: user.name,
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
        {/* <TextField className='post-comment__name-input'
          label="Enter your name"
          variant="outlined"
          name="author"
          size="small"
          value={commentToPost.author}
          onChange={(e) =>
            setCommentToPost({ ...commentToPost, author: e.target.value })} /> */}
        <TextField className='post-comment__comment'
          label="Comment"
          variant="outlined"
          name="comment"
          multiline
          rows={2}
          value={commentToPost.content}
          onChange={(e) =>
            setCommentToPost({ ...commentToPost, content: e.target.value })} />
        <Button className='post-comment__button' variant="outlined" type="submit">
          Comment
        </Button>
      </form>
    </>
  )
}