import { Button } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface UpvoteButtonProps {
  onUpvote: () => void;
  count: number;
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ count, onUpvote }) => {
  return (
    <Button
      onClick={onUpvote}
      style={{ padding: 0, minWidth: 0, margin: "0.5rem 0 1rem 0" }}
    >
      <ThumbUpIcon /> {count}
    </Button>
  );
};

export default UpvoteButton;
