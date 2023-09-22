import React from "react";
import { Modal, List, ListItem, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { EchoBoardResponseData } from "../Types";
import { Upvote } from "./Upvote";
import { upvoteComment } from "../Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";

interface CommentsModalProps {
  post: EchoBoardResponseData;
  handleClose: () => void;
  isOpen: boolean;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  handleClose,
  isOpen,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (commentId: string) => upvoteComment(post.id, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["echoBoard", post.id]);
      },
    }
  );

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
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          <h3>{post.title}</h3>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>{post.content}</p>
          <h4>{post.author}</h4>
        </Typography>
        <List>
          {post.echoBoardComments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                secondary={comment.author}
                primary={comment.comment}
              ></ListItemText>
              <Button onClick={() => mutation.mutate(comment.id)}>
                Upvote: {comment.upvote}
              </Button>
            </ListItem>
          ))}
        </List>
        <Upvote upvote={post.upvote} echoBoardId={post.id} />
      </div>
    </Modal>
  );
};

export default CommentsModal;
