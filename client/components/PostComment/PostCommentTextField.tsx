import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import "../../app/styles/PostComment.css";
import SendIcon from "@mui/icons-material/Send";

interface CommentFormProps {
  onCommentSubmit: (content: string) => void;
  initialContent?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onCommentSubmit,
  initialContent = "",
}) => {
  const [content, setContent] = useState(initialContent);
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);

  const handleTextAreaFocus = () => {
    setNumberOfRows(3);
    setIsSendButtonVisible(true);
  };

  const handleTextAreaBlur = () => {
    if (!content.trim()) {
      setNumberOfRows(1);
      setIsSendButtonVisible(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onCommentSubmit(content);
      setContent("");
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  return (
    <TextField
      className="post-comment__comment"
      label="Comment"
      variant="outlined"
      name="comment"
      multiline
      rows={numberOfRows}
      value={content}
      onChange={handleContentChange}
      onFocus={handleTextAreaFocus}
      onBlur={handleTextAreaBlur}
      onKeyDown={handleKeyPress}
      InputProps={{
        endAdornment: isSendButtonVisible && (
          <IconButton
            type="submit"
            style={{position: "absolute", bottom: "0", right: "0" }}
            color="primary"
            onClick={() => {
              onCommentSubmit(content);
              setContent("");
            }}
          >
            <SendIcon />
          </IconButton>
        ),
      }}
    />
  );
};
