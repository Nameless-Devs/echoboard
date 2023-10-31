"use client"
"use strict"
import { Message, UserResponseData } from '@/service/Types'
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'
import "../../app/styles/Chat.css"
import { ChatMessage } from './ChatMessage';
import { useQuery } from '@tanstack/react-query';
import { fetchChatRoomHistory } from '@/service/Functions';

type ChatProps = {
    user: UserResponseData;
}

const Chat: React.FC<ChatProps> = ({ user }) => {

    const [client, setClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const { data: chatHistory } = useQuery<Message[]>(
        ["messages"],
        async () => {
            console.log(chatHistory);
            return await fetchChatRoomHistory(1);
        }
    );

    const handleSendMessage = () => {
        if (client && input && client.connected) {
            const message = { sender: user.name, content: input, picture: user.picture, timestamp: new Date() };
            client.publish({
                destination: '/app/chat/sendMessage/1',
                body: JSON.stringify(message),
            });
            setInput('');

        }
    };

    const onMessageReceived = (message: IMessage) => {
        setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
    };

    useEffect(() => {

        const newClient = Stomp.client("ws://localhost:8080/w");


        newClient.onStompError = (frame) => {
            console.log('STOMP Error:', frame);
        };
        newClient.onConnect = () => {
            console.log("Connected")
            newClient.subscribe("/topic/chatrooms/1", (message) => {
                onMessageReceived(message);
                console.log(message)
            });
        },

            newClient.activate();
        setClient(newClient);
        if (chatHistory) setMessages(chatHistory);

        return () => {
            if (newClient) {
                newClient.deactivate();
            }
        };

    }, [chatHistory]);

    return (
        <div>
            <h1 style={{margin: '0px'}}>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <ChatMessage index={index} msg={msg} />
                    </div>
                ))}
            </div>
            <input
                type='text'
                placeholder="Type your message"
                value={input}
                onChange={handleMessageInput} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default Chat