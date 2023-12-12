import React, { useState } from "react";
import { CommentToPost, UserResponseData } from "@/service/Types";
import { Avatar, Box, Dialog, DialogContentText } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/service/Functions";
import { CommentForm } from "./PostCommentTextField";
import { StyledBadge } from "./StyledBadge";
import "../../app/styles/PostComment.css";

interface CommentProps {
  echoBoardId: string;
  user: UserResponseData;
}

export const PostComment: React.FC<CommentProps> = ({ echoBoardId, user }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation((data: CommentToPost) =>
    postComment(data, echoBoardId)
  );

  const handleCommentPost = (content: string) => {
    if (!content.trim()) {
      return;
    }

    const commentToPost = {
      author: user.name,
      content,
    };

    mutation.mutate(commentToPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.refetchQueries(["comments", echoBoardId]);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1500);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <>
      {isSuccess && (
        <Dialog open={isSuccess}>
          <DialogContentText style={{padding: "40px", color: "green", fontSize: "20px", textAlign: "center"}}>
          Your comment was successfully posted
          </DialogContentText>
        </Dialog>
      )}

       {/* Display the button when the form is not visible */}
       {!isFormVisible && (
        <button className="leave-a-comment-button" onClick={() => setIsFormVisible(true)}>
          Leave a comment
        </button>
      )}

      {/* Display the form when the form is visible */}
      {isFormVisible && (
      <form className="post-comment__form" onSubmit={(e) => e.preventDefault()}>
        <Box className="post-comment__box">
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                className="post-comment__avatar"
                alt={user.name + "avatar"}
                src={user.picture}
              />
            </StyledBadge>
          </Box >
          <CommentForm onCommentSubmit={handleCommentPost} />
        </Box>
      </form>
      )}
       {/* Hide the button when the form is visible */}
       {isFormVisible && <div style={{ height: "32px" }}></div>}
    </>
  );
};
