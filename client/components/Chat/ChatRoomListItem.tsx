import { ChatRoomResponse } from "@/service/Types";
import { ListItemButton } from "@mui/material";
import React from "react";

type ChatRoomListItemProps = {
    chatroom: ChatRoomResponse;
    index: number;
    selectedIndex: number;
    onSelectChatRoom: (chatroom: ChatRoomResponse) => void;
    setSelectedIndex: (index: number) => void;
}


const ChatRoomListItem: React.FC<ChatRoomListItemProps> = ({ chatroom, index, selectedIndex, onSelectChatRoom, setSelectedIndex }) => {
    return (
      <ListItemButton
        onClick={() => {
          onSelectChatRoom(chatroom);
          setSelectedIndex(index);
        }}
        style={{
          borderRadius: "10px",
          padding: "16px",
          color: "black",
          backgroundColor: selectedIndex === index ? "#d9dbdd" : "",
          margin: "0 0.5rem 0 0.5rem",
          border: "2px solid #c1c4c7",
          marginBottom: "0.3rem",
        }}
      >
        {chatroom.title}
      </ListItemButton>
    );
  };

  export default ChatRoomListItem;