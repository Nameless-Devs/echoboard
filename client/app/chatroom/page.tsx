"use client";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {
  fetchChatRoomHistory,
  getUserChatRooms,
  getUserInfo,
} from "@/service/Functions";
import { ChatRoomResponse, Message, SolutionResponseData } from "@/service/Types";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import subscribeToUserChatRooms from "@/service/chatRoomService";
import { WEBSOCKET } from "@/service/config";
import { useScrollToLatestMessage } from "@/hooks/useScrollToLatestMessage";
import CustomNavBar from "@/components/CustomNavBar";
import SendIcon from "@mui/icons-material/Send";
import { ChatSolutionInfo } from "@/components/Chat/ChatSolutionInfo";
import { LoadingLogo } from "@/components/LoadingLogo";
import { ChatMessageByUser } from "@/components/Chat/ChatMessageByUser";
import ChatRoomList from "@/components/Chat/ChatRoomList";
import { ChatRoomTextInfo } from "@/components/Chat/ChatRoomTextInfo";

const buttons = [
  { label: 'Home', link: '/' },
  { label: 'Chat', link: '/chatroom' }
];

export default function UserChat() {
  const { data: chatRooms } = useQuery(["chatRooms"], getUserChatRooms);

  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number>();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [solution, setSolution] = useState<SolutionResponseData>();

  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);

  const { data: chatHistory } = useQuery<Message[]>(
    ["messages", selectedChatRoomId],
    async () => {
      if (selectedChatRoomId) {
        return await fetchChatRoomHistory(selectedChatRoomId);
      }
      return [];
    }
  );

  useEffect(() => {
    const newClient = Stomp.client(WEBSOCKET.BASE_URL);

    newClient.onStompError = (frame) => {
      console.log("STOMP Error:", frame);
    };
    newClient.onConnect = () => {
      if (chatRooms) {
        const chatRoomIds = chatRooms.map((chatRoom) => chatRoom.id);
        subscribeToUserChatRooms(newClient, chatRoomIds, onMessageReceived);
      }
    };
    newClient.activate();
    setClient(newClient);
    if (chatHistory) setMessages(chatHistory);

    return () => {
      if (newClient) {
        newClient.deactivate();
      }
    };
  }, [chatHistory]);

  const scrollToLatestMessage = useScrollToLatestMessage(messages);

  if (isLoading) return <LoadingLogo />;

  if (error) return <div>Error</div>;

  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (client && input && client.connected) {
      const message = {
        sender: user?.name,
        content: input,
        picture: user?.picture,
        timestamp: new Date(),
      };
      client.publish({
        destination: WEBSOCKET.SEND_MESSAGE + selectedChatRoomId,
        body: JSON.stringify(message),
      });
      setInput("");
    }
  };

  const onMessageReceived = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
  };

  const handleChatRoomChange = (chatRoom: ChatRoomResponse) => {
    setSelectedChatRoomId(chatRoom.id);
    setSolution(chatRoom.echoBoardSolution);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {user &&
        <Box sx={{ display: 'flex', flexDirection: 'column', height: "100vh" }}>
          <CustomNavBar buttons={buttons} user={user} />
          <Grid
            container
            style={{ flex: 1, width: '100%' }}
          >
            {/*Left Grid*/}
            <Grid item xs={3} sx={{ height: "92vh", overflowY: 'auto', backgroundColor: "#faf9f6", borderRight: "3px solid #c1c4c7" }}>
              {chatRooms && <ChatRoomList chatRooms={chatRooms} selectedIndex={selectedIndex} onSelectChatRoom={handleChatRoomChange} setSelectedIndex={setSelectedIndex} />}
              {chatRooms?.length === 0 ? <ChatRoomTextInfo /> : <></> }
            </Grid>

            <Grid item xs={9} sx={{ height: "100%", backgroundColor: "#FAF9F7" }}>
              {/*Top Right*/}
              <Grid item xs={12} sx={{ height: "85%" }}>
                {!selectedChatRoomId &&
                  <Box sx={{
                    textAlign: "center",
                    padding: "2rem 1rem",
                  }}>
                    <Typography variant="h6" color="textSecondary">
                      Welcom to the Chat page where you can discuss the solution implementations with your fellow volunteers.
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Select the chat room and start talking!
                    </Typography>
                  </Box>
                }
                <Grid item xs={12}>
                  {solution && <ChatSolutionInfo solution={solution} />}
                </Grid>
                <Grid item xs={12} sx={{ maxHeight: "62vh", overflow: "auto" }}>
                  <Box >
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
                {selectedChatRoomId && <TextField
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
                />}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      }
    </>
  );
}
