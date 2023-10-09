import React, { useState } from 'react'
import { CommentToPost, UserResponseData } from '@/service/Types';
import { Avatar, Box, Button, IconButton, TextField } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from '@/service/Functions';
import "../app/styles/PostComment.css"
import { useCookies } from 'react-cookie';
import { StyledBadge } from './StyledBadge';
import SendIcon from "@mui/icons-material/Send";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  const mutation = useMutation((data: CommentToPost) =>
    postComment(data, echoBoardId, cookies.JwtToken)
  );

  const handleTextAreaFocus = () => {
    setNumberOfRows(3);
    setIsSendButtonVisible(true);
  }
  const handleTextAreaBlur = () => {
    if (!commentToPost.content.trim()) {
    setNumberOfRows(1);
    setIsSendButtonVisible(false);
  }
  handleTextAreaFocus;
  }
  const handleCommentPost = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

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
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1500);
        setNumberOfRows(1);
        setIsSendButtonVisible(false);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      // Prevent the default behavior of Enter key (submitting the form)
      event.preventDefault();
      // Trigger the comment submission here
      handleCommentPost();
    }
  };

  return (
    <>
      {isSuccess && <h3 className='post-comment__success-msg'>Your comment was successfully posted</h3>}
      <form className='post-comment__form' onSubmit={handleCommentPost}>
        <Box className='post-comment__box'>
          <Box>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar className='post-comment__avatar' alt={user.name + "avatar"} src={user.picture} />
          </StyledBadge>
          </Box>
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
            onKeyDown={(event) => handleKeyPress(event)}
            InputProps={{
              endAdornment: isSendButtonVisible && (
                <IconButton type="submit" color="primary" className='post-comment__send-icon' style={{position: 'absolute', bottom: "0", right: "0"}}>
                  <SendIcon />
                </IconButton> 
              ),
            }}
          />
        </Box>
      </form>
    </>
  );
};
