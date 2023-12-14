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
  // Check if the time difference between consecutive messages is within the time limit
  const currentTimestamp = new Date(msg.timestamp).getTime();
  const previousTimestamp = index > 0 ? new Date(messages[index - 1].timestamp).getTime() : 0;
  const timeDifference = currentTimestamp - previousTimestamp;
  const isWithinTimeLimit = index > 0 && timeDifference <= TIME_LIMIT;

  const isFirstMessage = !isWithinTimeLimit || index === 0;
  const isLastMessage = index === messages.length - 1 || !isWithinTimeLimit;

  return (
    <ListItem key={index} className={`message-display ${isWithinTimeLimit ? 'consecutive-message' : ''}`}>
      {/* {isFirstMessage && <Avatar src={msg.picture} style={{ marginRight: "15px" }} />} */}

      <ListItemText
        primary={
          <Typography variant="body2">
            {isFirstMessage && msg.sender}
          </Typography>
        }
        secondary={
          <Typography variant="body1">
            {msg.content}
          </Typography>
        }
      />

      {isLastMessage &&
        <>
          <Typography>{formatTimestamp(msg.timestamp)}</Typography>
          <Avatar src={msg.picture} />
        </>}
    </ListItem>
  );
};



