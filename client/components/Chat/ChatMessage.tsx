import { formatTimestamp } from "@/service/TimeConverterForMessages";
import { Message } from "@/service/Types";
import { Avatar, Grid, ListItem, Typography } from "@mui/material";
import React from "react";
import "../../app/styles/Chat.css";

type ChatMessageProps = {
  index: number;
  msg: Message;
  messages: Message[];
};

const TIME_LIMIT = 2 * 60 * 1000; // 2 minutes in milliseconds

export const ChatMessage: React.FC<ChatMessageProps> = ({ index, msg, messages }) => {
  const currentTimestamp = new Date(msg.timestamp).getTime();
  const previousTimestamp = index > 0 ? new Date(messages[index - 1].timestamp).getTime() : 0;
  const timeDifference = currentTimestamp - previousTimestamp;
  const isWithinTimeLimit = index > 0 && timeDifference <= TIME_LIMIT;

  const isFirstMessage = !isWithinTimeLimit || index === 0;
  const isLastMessage =
  (index === messages.length - 1 && isWithinTimeLimit) || (!isWithinTimeLimit && index > 0);


  return (
    <ListItem key={index} className={`message-display ${isWithinTimeLimit ? 'consecutive-message' : ''}`}>
      <Grid container>
        <Grid item xs={1}>
        {(isLastMessage || (messages.length === 1 && isFirstMessage)) && <Avatar src={msg.picture} />}
        </Grid>
        <Grid item xs={11}>
          {isFirstMessage && (
            <>
              <Typography variant="body2">
                {msg.sender}
              </Typography>
              <Typography variant="body1">
                {msg.content}
              </Typography>
            </>
          )}

          {!isFirstMessage && !isLastMessage && (
            <Typography variant="body1">
              {msg.content}
            </Typography>
          )}

          {isLastMessage && (
            <>
             <Typography variant="body1">
              {msg.content}
            </Typography>
              <Typography>{formatTimestamp(msg.timestamp)}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};