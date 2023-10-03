import React, { useState } from "react";
import { SolutionToPost } from "../service/Types";
import { Button, Modal, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSolution } from "../service/Functions";
import { useCookies } from "react-cookie";

type SolutionProps = {
  echoBoardId: string;
  handleClose: () => void;
  isOpen: boolean;
  onSolutionPosted: () => void;
};

export const PostSolution: React.FC<SolutionProps> = ({
  echoBoardId,
  handleClose,
  isOpen,
  onSolutionPosted,
}) => {
  const [solutionToPost, setSolutionToPost] = useState<SolutionToPost>({
    author: "",
    content: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [cookies] = useCookies();

  const queryClient = useQueryClient();
  const mutation = useMutation((data: SolutionToPost) =>
    postSolution(data, echoBoardId, cookies.JwtToken)
  );

  const handleSolutionPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!solutionToPost.author.trim() || !solutionToPost.content.trim()) {
      return;
    }
    mutation.mutate(solutionToPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.refetchQueries(["solution", echoBoardId]);
        setSolutionToPost({
          author: "",
          content: "",
        });
        setIsSuccess(true);
        onSolutionPosted();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5px",
        }}
      >
        {isSuccess ? (
          <h3 style={{ color: "green" }}>
            Your solution was successfully posted
          </h3>
        ) : (
          <>
            <h3>Here you can share your solution ideas</h3>
            <form className="post-comment__form" onSubmit={handleSolutionPost}>
              <TextField
                className="post-comment__name-input"
                label="Enter your name"
                variant="outlined"
                name="author"
                size="small"
                value={solutionToPost.author}
                onChange={(e) =>
                  setSolutionToPost({
                    ...solutionToPost,
                    author: e.target.value,
                  })
                }
              />
              <TextField
                className="post-comment__comment"
                label="Solution"
                variant="outlined"
                name="content"
                multiline
                rows={4}
                value={solutionToPost.content}
                onChange={(e) =>
                  setSolutionToPost({
                    ...solutionToPost,
                    content: e.target.value,
                  })
                }
              />
              <Button
                className="post-comment__button"
                variant="outlined"
                type="submit"
              >
                Suggest solution
              </Button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};