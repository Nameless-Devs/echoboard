import { Message } from '@/service/Types';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

type ChatMessageProps = {
    index: number; 
    msg: Message; 
}

export const ChatMessage: React.FC<ChatMessageProps> = ({index, msg}) => {
    return (
        <ListItem key={index} className="message-display">
            <Avatar src={msg.picture} style={{ marginRight: "15px" }} />
            <ListItemText
                primary={
                    <Typography variant="body2" color="textSecondary">
                        {msg.sender}
                    </Typography>
                }
                secondary={
                    <Typography variant="body1" color="textPrimary">
                        {msg.content}
                    </Typography>
                }
            ></ListItemText>
        </ListItem>
    )
}