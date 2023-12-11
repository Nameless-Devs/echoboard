"use client";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {
  fetchChatRoomHistory,
  getUserChatRooms,
  getUserInfo,
} from "@/service/Functions";
import { Message } from "@/service/Types";
import { Button, Grid, Input, ListItemButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import subscribeToUserChatRooms from "@/service/chatRoomService";
import { WEBSOCKET } from "@/service/config";
import { useScrollToLatestMessage } from "@/hooks/useScrollToLatestMessage";
import { LoadingPage } from "@/components/Shared/LoadingPage/LoadingPage";

export default function UserChat() {
  const { data: chatRooms } = useQuery(["chatRooms"], getUserChatRooms);

  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number>();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

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

  if (isLoading) return <LoadingPage />;

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
        destination: "/app/chat/sendMessage/" + selectedChatRoomId,
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
    <Grid
      container
      style={{ position: "absolute", height: "100%", width: "100%" }}
    >
      {/*Left Grid*/}
      <Grid item xs={2} sx={{ height: "100%", backgroundColor: "#292b2f" }}>
        {displayUserChatrooms()}
      </Grid>
      <Grid item xs={10} sx={{ height: "100%", backgroundColor: "rgb(250, 249, 246)" }}>
        {/*Top Right*/}
        <Grid item xs={12} sx={{ height: "90%", overflowY: "scroll" }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <ChatMessage index={index} msg={msg} />
            </div>
          ))}
          <div ref={scrollToLatestMessage} />
        </Grid>
        {/*Bottom Right*/}
        <Grid
          item
          xs={12}
          sx={{
            height: "10%",
            outline: "10px blue",
            backgroundColor: "rgb(250, 249, 246)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "1rem",
              backgroundColor: "#4a4c51",
              borderRadius: "5px",
            }}
          >
            <Input
              sx={{
                width: "80%",
                color: "#f1f1f1",
              }}
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

  function displayUserChatrooms() {
    return (
      <>
        <h1 style={{ margin: "1em" }}>ChatRoom</h1>
        {chatRooms?.map((chatroom, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              handleChatRoomChange(chatroom.id);
              setSelectedIndex(index);
            }}
            style={{
              borderRadius: "10px",
              padding: "16px",
              color: "#f1f1f1",
              backgroundColor: selectedIndex === index ? "#424549" : "",
              margin: "0 0.5rem 0 0.5rem",
            }}
          >
            {chatroom.title}
          </ListItemButton>
        ))}
      </>
    );
  }
}
