"use client";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import {
  fetchChatRoomHistory,
  getUserChatRooms,
  getUserInfo,
} from "@/service/Functions";
import { ChatRoomResponse, Message, SolutionResponseData } from "@/service/Types";
import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import subscribeToUserChatRooms from "@/service/chatRoomService";
import { WEBSOCKET } from "@/service/config";
import CustomNavBar from "@/components/CustomNavBar";
import { LoadingLogo } from "@/components/LoadingLogo";
import { LeftGrid } from "@/components/Chat/LeftGrid";
import { RightGrid } from "@/components/Chat/RightGrid";

const buttons = [
  { label: 'Home', link: '/' },
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
            <LeftGrid
              chatRooms={chatRooms}
              selectedIndex={selectedIndex}
              handleChatRoomChange={handleChatRoomChange}
              setSelectedIndex={setSelectedIndex}
            />
            <RightGrid
              selectedChatRoomId={selectedChatRoomId}
              solution={solution}
              messages={messages}
              input={input}
              handleKeyPress={handleKeyPress}
              handleMessageInput={handleMessageInput}
              handleSendMessage={handleSendMessage}
              user={user}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
            />
          </Grid>
        </Box>
      }
    </>
  );
}
