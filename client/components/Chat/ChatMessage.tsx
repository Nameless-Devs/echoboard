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

  const isFirstMessage = !isWithinTimeLimit || index === 0 || (index > 0 && msg.sender !== messages[index - 1].sender) ;

  return (
    <ListItem key={index} sx={{margin: "0.1rem 0", padding: ".3rem 0"}}>
      <Grid container sx={{ maxWidth: "70%"}}>
        <Grid item xs={1} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
          {isFirstMessage && 
            <Avatar src={msg.picture} />
         }
        </Grid>
        <Grid item xs={11}>
            <>
              <Box className={isFirstMessage? "first": "middle" }
               sx={{
                backgroundColor: "#d9dbdd",
                width: "fit-content",
                blockSize: "fit-content",
                display: "block",
                padding: ".3rem 1rem",
              }}>
                {isFirstMessage && (
                <Typography variant="body1" sx={{marginTop: ".2rem"}}>
                  {msg.sender}
                </Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }} >
                  <Typography variant="body1">
                    {msg.content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{minWidth: "fit-content"}}>
                    {formatTimestamp(msg.timestamp)}
                  </Typography>
                </Box>
              </Box>
            </>
        </Grid>
      </Grid>
    </ListItem>
  );
};