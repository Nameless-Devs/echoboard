import { formatTimestamp } from "@/service/TimeConverterForMessages";
import { Message } from "@/service/Types";
import { Avatar, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import "../../app/styles/Chat.css";

type ChatMessageProps = {
  index: number;
  msg: Message;
  messages: Message[];
};

const TIME_LIMIT = 3 * 60 * 1000; // 3 minutes in milliseconds

export const ChatMessage: React.FC<ChatMessageProps> = ({ index, msg, messages }) => {
  const isWithinTimeLimit =
    index > 0 &&
    new Date(msg.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() <= TIME_LIMIT;

  return (
    <ListItem key={index} className={`message-display ${isWithinTimeLimit ? 'consecutive-message' : ''}`}>
      {!isWithinTimeLimit && <Avatar src={msg.picture} style={{ marginRight: "15px" }} />}

      <ListItemText
        primary={
          <Typography variant="body2">
            {!isWithinTimeLimit && msg.sender} {formatTimestamp(msg.timestamp)}
          </Typography>
        }
        secondary={
          <Typography variant="body1">
            {msg.content}
          </Typography>
        }
      />
    </ListItem>
  );
};



