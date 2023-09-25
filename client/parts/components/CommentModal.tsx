import React from "react";
import { Modal, List, ListItem, ListItemText, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { EchoBoardResponseData } from "../Types";
import { Upvote } from "./Upvote";
import { PostComment } from "./PostComment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchEchoBoardById } from "../Functions";
import { upvoteComment } from "../Functions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import "../../app/styles/CommentModalStyles.css";

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
  const { data: updatedPost } = useQuery<EchoBoardResponseData>(
    ["comments", post.id],
    async () => {
      const result = await fetchEchoBoardById(post.id);
      return result;
    }
  );

  const displayPost = updatedPost || post;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (commentId: string) => upvoteComment(post.id, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["comments", post.id]);
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
          borderRadius: "5px",
        }}
      >
        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            {post.author}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="h6" color="text.secondary">
            {post.title}
          </Typography>
        </Box>
        <Box style={{ borderBottom: "1px solid #e0e0e0" }}>
          <Typography mb={1} variant="h6">
            {post.content}
          </Typography>
          <Upvote upvote={displayPost.upvote} echoBoardId={displayPost.id} />
        </Box>
        <Box
          className="comment-display"
          style={{ maxHeight: "300px", overflow: "auto" }}
        >
          <List>
            {displayPost.echoBoardComment
              .sort((a, b) => b.upvote - a.upvote)
              .map((comment, index) => (
                <ListItem
                  className="comment-display__individual-comment"
                  key={index}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textSecondary">
                        {comment.author}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1" color="textPrimary">
                        {comment.comment}
                      </Typography>
                    }
                  ></ListItemText>
                  <Button onClick={() => mutation.mutate(comment.id)}>
                    Upvote: {comment.upvote}
                  </Button>
                </ListItem>
              ))}
          </List>
        </Box>
        <PostComment echoBoardId={displayPost.id} />
      </div>
    </Modal>
  );
};

export default CommentsModal;
