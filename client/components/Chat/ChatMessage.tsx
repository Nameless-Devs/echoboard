import { timeConverter } from "@/service/TimeConverter";
import { Message } from "@/service/Types";
import { Avatar, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

type ChatMessageProps = {
  index: number;
  msg: Message;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ index, msg }) => {
  return (
    <ListItem key={index} className="message-display">
      <Avatar src={msg.picture} style={{ marginRight: "15px" }} />
      <ListItemText
        primary={
          <Typography variant="body2">
            {msg.sender} {timeConverter(msg.timestamp)}
          </Typography>
        }
        secondary={
          <Typography variant="body1">
            {msg.content}
          </Typography>
        }
        
      ></ListItemText>
    </ListItem>
  );
};
