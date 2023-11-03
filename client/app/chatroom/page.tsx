"use client";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {
  fetchChatRoomHistory,
  getUserChatRooms,
  getUserInfo,
} from "@/service/Functions";
import { Message } from "@/service/Types";
import {Button, Grid, Input, ListItemButton, Paper} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import subscribeToUserChatRooms from "@/service/chatRoomService";
import { WEBSOCKET } from "@/service/config";

export default function UserChat() {
  const { data: chatRooms } = useQuery(["chatRooms"], getUserChatRooms);

  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number>();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);

  

  const { data: chatHistory } = useQuery<Message[]>(["messages", selectedChatRoomId], async () => {
    if (selectedChatRoomId) {
      return await fetchChatRoomHistory(selectedChatRoomId);
    }
    return [];

  });

  useEffect(() => {
    const newClient = Stomp.client(WEBSOCKET.BASE_URL);

    newClient.onStompError = (frame) => {
      console.log("STOMP Error:", frame);
    };
    newClient.onConnect = () => {
      if (chatRooms) {
        subscribeToUserChatRooms(newClient, chatRooms, onMessageReceived);
      }}
    newClient.activate();
    setClient(newClient);
    if (chatHistory) setMessages(chatHistory);

    return () => {
      if (newClient) {
        newClient.deactivate();
      }
    };
  }, [chatHistory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

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
        destination: "/app/chat/sendMessage/" +selectedChatRoomId,
        body: JSON.stringify(message),
      });
      setInput("");
    }
  };

  const onMessageReceived = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
  };

  const handleChatRoomChange = (chatRoomId: number) => {
    setSelectedChatRoomId(chatRoomId);
  };

  return (
      <Grid container style={{ position: 'absolute', height: '100%', width: '100%' }}>
        {/*Left Grid*/}
        <Grid item xs={2} sx={{ height: '100%', backgroundColor: "#f1f1f1"}}>
             {chatRooms?.map((chatroom, index) => (
                 <ListItemButton
                     key={index}
                     onClick={() => handleChatRoomChange(chatroom)}
                     style={{ borderRadius: "10px", padding: "16px" }}
                 >
                   {chatroom}
                 </ListItemButton>
             ))}
        </Grid>
        <Grid item xs={10} sx={{ height: '100%'}}>
          {/*Top Right*/}
          <Grid item xs={12} sx={{ height: '90%', overflowY: "scroll" }}>
            {messages.map((msg, index) => (
                <div key={index}>
                  <ChatMessage index={index} msg={msg} />
                </div>
            ))}
          </Grid>
          {/*Top Left*/}
          <Grid item xs={12} sx={{
            height: '10%',
            outline: '10px blue',
            backgroundColor: "#f1f1f1",
            paddingLeft: "1rem",
          }}>
            <div style={{display:"flex",
              flexDirection: "row",
              justifyContent:"space-between",
              paddingTop: "2rem",
              paddingRight: "1rem"}}>
            <Input
                type="text"
                placeholder="Enter a message"
                value={input}
                disableUnderline={true}
                onChange={handleMessageInput}
            />
            <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
  );
}