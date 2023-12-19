import React from "react";
import { Box } from "@mui/material";
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ChatRoomListItem from "./ChatRoomListItem";
import { ChatRoomResponse } from "@/service/Types";

type ChatRoomListProps = {
    chatRooms: ChatRoomResponse[];
    selectedIndex: number;
    onSelectChatRoom: (chatroom: ChatRoomResponse) => void;
    setSelectedIndex: (index: number) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms, selectedIndex, onSelectChatRoom, setSelectedIndex }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", margin: "0 1rem" }} >
        <QuestionAnswerRoundedIcon sx={{ color: "#424242", mr: ".3rem" }} />
        <h2 style={{ margin: "1em 0 ", color: "#424242" }}>Your chat rooms</h2>
      </Box>
      {chatRooms && chatRooms?.slice().reverse().map((chatroom, index) => (
        <ChatRoomListItem
          key={index}
          chatroom={chatroom}
          index={index}
          selectedIndex={selectedIndex}
          onSelectChatRoom={onSelectChatRoom}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
    </>
  );
};

export default  ChatRoomList;