import { Button } from "@mui/material";
import React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface UpvoteButtonProps {
  onUpvote: () => void;
  count: number;
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ count, onUpvote }) => {
  return <Button onClick={onUpvote} style={{position: "absolute", bottom: "0", right: "0"}}>
    <ThumbUpIcon /> {count}</Button>;
};

export default UpvoteButton;
