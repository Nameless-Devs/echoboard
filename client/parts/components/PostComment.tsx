import React, { useState } from 'react'
import { CommentToPost, UserResponseData } from '../Types';
import { Avatar, Box, Button, TextField } from '@mui/material';
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
  const [numberOfRows, setNumberOfRows] = useState<number>(1);

  const [cookies] = useCookies();

  const queryClient = useQueryClient();
  const mutation = useMutation((data: CommentToPost) => postComment(data, echoBoardId, cookies.JwtToken));


  const handleTextAreaFocus = () => { 
   setNumberOfRows(3);
  }
  const handleTextAreaBlur = () => {
    setNumberOfRows(1);
  }
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
        <Box style={{display: "flex", justifyContent: "space-around", width: "94%", gap: "9px"}}>
        <Avatar src={user.picture} />
        <TextField className='post-comment__comment'
          label="Comment"
          variant="outlined"
          name="comment"
          multiline
          rows={numberOfRows}
          value={commentToPost.content}
          onChange={(e) =>
            setCommentToPost({ ...commentToPost, content: e.target.value })} 
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
        
          />
        </Box>
        <Button className='post-comment__button' variant="outlined" type="submit">
          Comment
        </Button>
      </form>
    </>
  )
}
