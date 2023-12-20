import { TextField, IconButton } from '@mui/material'
import React from 'react'
import SendIcon from "@mui/icons-material/Send";

type SendMessageInputProps = {
    input: string;
    handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleMessageInput: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSendMessage: () => void;

}
export const SendMessageInputField: React.FC<SendMessageInputProps> = ({
    input,
    handleKeyPress,
    handleMessageInput,
    handleSendMessage,
}) => {
    return (
        <TextField
            label="Enter a message"
            variant="outlined"
            name="message"
            multiline
            rows="2"
            type="text"
            placeholder="Enter a message"
            value={input}
            onKeyDown={handleKeyPress}
            onChange={handleMessageInput}
            sx={{
                width: "100%",
                backgroundColor: "#F0F2F5"
            }}
            InputProps={{
                endAdornment:
                    <IconButton
                        type="submit"
                        style={{ position: "absolute", bottom: "0", right: "0" }}
                        color="primary"
                        onClick={() => handleSendMessage()}
                    >
                        <SendIcon />
                    </IconButton>
            }}
        />
    )
}
