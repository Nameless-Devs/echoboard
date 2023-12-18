import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Message } from "@/service/Types";
import { fetchChatRoomHistory } from "@/service/Functions";
import { ChatMessage } from "./ChatMessage";

interface ChatRoomHistoryProp {
  chatRoomId: number;
}

function ChatRoomHistory({ chatRoomId }: ChatRoomHistoryProp) {
  const { data: chatHistory } = useQuery<Message[]>(
    ["messages", chatRoomId],
    async () => {
      return await fetchChatRoomHistory(chatRoomId);
    }
  );

  if (chatHistory) {
    return (
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <ChatMessage index={index} msg={message} messages={chatHistory} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default ChatRoomHistory;
