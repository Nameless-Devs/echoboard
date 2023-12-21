import { Grid, Box } from '@mui/material'
import React from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatMessageByUser } from './ChatMessageByUser'
import { ChatSolutionInfo } from './ChatSolutionInfo'
import { SendMessageInputField } from './SendMessageInputField'
import { Message, SolutionResponseData, UserResponseData } from '@/service/Types'
import { useScrollToLatestMessage } from '@/hooks/useScrollToLatestMessage'
import { ChatPageTextInfo } from './ChatPageTextInfo'

type RightGridProps = {
    selectedChatRoomId: number | undefined;
    solution: SolutionResponseData | undefined;
    messages: Message[];
    input: string;
    handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleMessageInput: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSendMessage: () => void;
    user: UserResponseData;
}

export const RightGrid: React.FC<RightGridProps> = ({
    selectedChatRoomId,
    solution,
    messages,
    input,
    handleKeyPress,
    handleMessageInput,
    handleSendMessage,
    user,
}) => {
    const scrollToLatestMessage = useScrollToLatestMessage(messages);
    return (
        <>
        <Grid item xs={0} md={9} sx={{ 
            height: "100%", 
            backgroundColor: "#FAF9F7",
            display: {xs: "none", md: "block"},
             }}>
            {/*Top Right*/}
            <Grid item xs={12} sx={{ height: "85%" }}>
                {!selectedChatRoomId && <ChatPageTextInfo />}
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
        <Grid item xs={12} md={0} sx={{ 
            height: "100%", 
            backgroundColor: "#FAF9F7",
            display: {xs: selectedChatRoomId !== undefined ? "block" : "none", md: "none" },
             }}>
            {/*Top Right*/}
            <Grid item xs={12} sx={{ height: "85%" }}>
                {!selectedChatRoomId && <ChatPageTextInfo />}
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
        </>
    )
}
