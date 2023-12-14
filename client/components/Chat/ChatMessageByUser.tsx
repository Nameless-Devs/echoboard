import { formatTimestamp } from '@/service/TimeConverterForMessages';
import { Message } from '@/service/Types';
import { ListItem, Avatar, ListItemText, Typography } from '@mui/material';
import React from 'react'

type ChatMessageProps = {
    index: number;
    msg: Message;
  };
  
export const ChatMessageByUser: React.FC<ChatMessageProps> = ({ index, msg }) => {
    return (
      <ListItem key={index} >
        <ListItemText
          primary={
            <Typography variant="body2">
              {msg.sender} {formatTimestamp(msg.timestamp)}
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
