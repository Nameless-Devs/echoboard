import { formatTimestamp } from "@/service/TimeConverterForMessages";
import { Message } from "@/service/Types";
import { Box, ListItem, Typography } from "@mui/material";
import React from "react";
import "../../app/styles/Chat.css";

type ChatMessageProps = {
  index: number;
  msg: Message;
};


export const ChatMessageByUser: React.FC<ChatMessageProps> = ({ index, msg }) => {

  return (
    <ListItem key={index} sx={{margin: ".1rem .5rem", ml: "auto", padding: ".3rem 0", alignItems: "right", width: "70%"}}>
            <>
              <Box sx={{
                backgroundColor: "#bfe4f6",
                width: "fit-content",
                blockSize: "fit-content",
                display: "block",
                padding: ".3rem 1rem",
                borderRadius: "1.5rem",
                ml: "auto"
              }}>
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
    </ListItem>
  );
};
