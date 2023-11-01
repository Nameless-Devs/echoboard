"use client";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {
  fetchChatRoomHistory,
  getUserChatRooms,
  getUserInfo,
} from "@/service/Functions";
import { Message } from "@/service/Types";
import { Grid, ListItemButton, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import subscribeToUserChatRooms from "@/service/chatRoomService";

export default function UserChat() {
  const { data: chatrooms } = useQuery(["chatRooms"], getUserChatRooms);

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
    const newClient = Stomp.client("ws://localhost:8080/w");

    newClient.onStompError = (frame) => {
      console.log("STOMP Error:", frame);
    };
    (newClient.onConnect = () => {
      if (chatrooms) {
        subscribeToUserChatRooms(newClient, chatrooms, onMessageReceived);
      }
    }),
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper
            elevation={3}
            style={{ height: "100vh", background: "#E0E0E0" }}
          >
            <div>
              {chatrooms?.map((chatroom, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleChatRoomChange(chatroom)}
                >
                  {chatroom}
                </ListItemButton>
              ))}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper
            elevation={0}
            style={{
              height: "75vh",
              padding: 16,
              background: "gray",
              marginBottom: "2.2em",
            }}
          >
            <h1 style={{ margin: "0px" }}>Message</h1>
            {selectedChatRoomId && <ChatRoomHistory chatRoomId={selectedChatRoomId} />}
          </Paper>
          <Paper
            elevation={0}
            style={{ height: "15vh", padding: 16, background: "gray" }}
          >
            <input
              type="text"
              placeholder="Type your message"
              value={input}
              onChange={handleMessageInput}
            />
            <button onClick={handleSendMessage}>Send</button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
