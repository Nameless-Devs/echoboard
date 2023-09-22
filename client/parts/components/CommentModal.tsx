import React from "react";
import { Modal, List, ListItem, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { EchoBoardResponseData } from "../Types";
import { Upvote } from "./Upvote";
import { comment } from "postcss";
import { PostComment } from "./PostComment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEchoBoardById } from "../Functions";

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
  // const queryClient = useQueryClient();
  // const { data: updatedPost, isLoading, isError } = useQuery<EchoBoardResponseData>(
  //   ["echoBoard", post.id], 
  //   () => fetchEchoBoardById(post.id)
  // );


  const { data: updatedPost, isLoading, isError } = useQuery<EchoBoardResponseData>(
    ["comments", post.id], 
    async () => {
      console.log("Fetching data for post:", post.id);
      const result = await fetchEchoBoardById(post.id);
      console.log("Fetched data:", result);
      return result;
    }
  );
  
  // Add a log to check if the component re-renders
  console.log("CommentsModal re-rendered");
   const displayPost = updatedPost || post;

  
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
          {displayPost.echoBoardComments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                secondary={comment.author}
                primary={comment.comment}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
        <Upvote upvote={displayPost.upvote} echoBoardId={displayPost.id} /> 
        {/* Nate, we might have a conflict there */}
        <PostComment echoBoardId={displayPost.id} />
      </div>
    </Modal>
  );
};

export default CommentsModal;
