import { formatTimestamp } from "@/service/TimeConverterForMessages";
import { Message } from "@/service/Types";
import { Avatar, Box, Grid, ListItem, Typography } from "@mui/material";
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

  return (
    <ListItem key={index} className={`message-display ${isWithinTimeLimit ? 'consecutive-message' : ''}`}>
      <Grid container>
        <Grid item xs={1}>
          {isFirstMessage && <Avatar src={msg.picture} />}
        </Grid>
        <Grid item xs={11}>
          {isFirstMessage && (
            <>
              <Box sx={{
                backgroundColor: "#c1c4c7",
                width: "fit-content",
                maxWidth: "60%",
                blockSize: "fit-content",
                display: "block",
                padding: ".3rem 1rem",
                borderRadius: "1.5rem"
              }}>
                <Typography variant="body1">
                  {msg.sender}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: "1rem" }} >
                  <Typography variant="body1">
                    {msg.content}
                  </Typography>
                  <Typography variant="caption">
                    {formatTimestamp(msg.timestamp)}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          {!isFirstMessage && (
            <Typography variant="body1">
              {msg.content}
            </Typography>
          )}

        </Grid>
      </Grid>
    </ListItem>
  );
};