import { Grid } from '@mui/material'
import React from 'react'
import ChatRoomList from './ChatRoomList'
import { ChatRoomTextInfo } from './ChatRoomTextInfo'
import { ChatRoomResponse } from '@/service/Types'

type LeftGridProps = {
    chatRooms: ChatRoomResponse[] | undefined;
    selectedIndex: number;
    handleChatRoomChange: (chatRoom: ChatRoomResponse) => void; 
    setSelectedIndex: (index: number) => void;
}

export const LeftGrid: React.FC<LeftGridProps> = ({ 
    chatRooms, 
    selectedIndex, 
    handleChatRoomChange, 
    setSelectedIndex, 
}) => {
    const xs = selectedIndex > -1 ? 0 : 12;
    return (
        <Grid item xs={12} md={3} sx={{ 
            height: "92vh", 
            overflowY: 'auto', 
            backgroundColor: "#faf9f6", 
            borderRight: "3px solid #c1c4c7",
            display: selectedIndex > -1 ? "none" : "block" 
            }}>
            {chatRooms && <ChatRoomList chatRooms={chatRooms} selectedIndex={selectedIndex} onSelectChatRoom={handleChatRoomChange} setSelectedIndex={setSelectedIndex} />}
            {chatRooms?.length === 0 ? <ChatRoomTextInfo /> : <></>}
        </Grid>
    )
}
