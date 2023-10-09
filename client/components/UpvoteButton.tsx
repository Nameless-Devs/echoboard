import { Button } from "@mui/material";
import React from "react";

interface UpvoteButtonProps {
  onUpvote: () => void;
  count: number;
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ count, onUpvote }) => {
  return <Button onClick={onUpvote}>Upvote: {count}</Button>;
};

export default UpvoteButton;
