"use client";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {fetchChatHistory, getUserChatRooms, getUserInfo} from "@/service/Functions";
import { Message, UserResponseData } from "@/service/Types";
import { Grid, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

export default function UserChat() {

  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { data: user, error, isLoading } = useQuery(["userInfo"], getUserInfo);
  const { data: chatrooms } = useQuery(["chatRooms"], getUserChatRooms)
  const { data: chatHistory } = useQuery<Message[]>(["messages"], async () => {
    return await fetchChatHistory(1);
  });

  useEffect(() => {
    const newClient = Stomp.client("ws://localhost:8080/w");

    newClient.onStompError = (frame) => {
      console.log("STOMP Error:", frame);
    };
    (newClient.onConnect = () => {
      // console.log("Connected");
      // newClient.subscribe("/topic/chatrooms/1", (message) => {
      //   onMessageReceived(message);
      //   console.log(message);
      // });
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
        destination: "/app/chat/sendMessage/1",
        body: JSON.stringify(message),
      });
      setInput("");
    }
  };

  const onMessageReceived = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
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
                  <div key={index}>{chatroom}</div>
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
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <ChatMessage index={index} msg={msg} />
                </div>
              ))}
            </div>
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
