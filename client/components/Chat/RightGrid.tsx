import { Grid, Box } from '@mui/material'
import input from 'postcss/lib/input'
import React from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatMessageByUser } from './ChatMessageByUser'
import { ChatRoomTextInfo } from './ChatRoomTextInfo'
import { ChatSolutionInfo } from './ChatSolutionInfo'
import { SendMessageInputField } from './SendMessageInputField'

export const RightGrid = () => {
    return (
        <Grid item xs={9} sx={{ height: "100%", backgroundColor: "#FAF9F7" }}>
            {/*Top Right*/}
            <Grid item xs={12} sx={{ height: "85%" }}>
                {!selectedChatRoomId && <ChatRoomTextInfo />}
                <Grid item xs={12}>
                    {solution && <ChatSolutionInfo solution={solution} />}
                </Grid>
                <Grid item xs={12} sx={{ maxHeight: "62vh", overflow: "auto" }}>
                    <Box>
                        {messages.map((msg, index) => (
                            msg.subject === user.subject ? (
                                <ChatMessageByUser key={index} index={index} msg={msg} />
                            ) : (
                                <ChatMessage key={index} index={index} msg={msg} messages={messages} />
                            )
                        ))}
                        <div ref={scrollToLatestMessage} />
                    </Box>
                </Grid>
            </Grid>
            {/*Bottom Right*/}
            <Grid
                item
                xs={12}
                sx={{
                    height: "15%",
                    outline: "10px blue",
                    backgroundColor: "rgb(250, 249, 246)",
                    padding: "1rem",
                }}
            >
                {selectedChatRoomId &&
                    <SendMessageInputField
                        input={input}
                        handleKeyPress={handleKeyPress}
                        handleMessageInput={handleMessageInput}
                        handleSendMessage={handleSendMessage}
                    />}
            </Grid>
        </Grid>
    )
}
