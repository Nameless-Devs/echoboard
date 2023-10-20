"use client"
import { Message, UserResponseData } from '@/service/Types'
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'

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

    const handleSendMessage = () => {
        if (client && input && client.connected) {
            //Pass in user here and set the name as user.name
            const message = { sender: user.name, content: input, timestamp: new Date() };
            client.publish({
                destination: '/app/chat/sendMessage',
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
            newClient.subscribe("/topic/chatrooms", (message) => {
                onMessageReceived(message);
                console.log(message)
            });
        },

        newClient.activate();
        setClient(newClient);

        return () => {
            if (newClient) {
                newClient.deactivate();
            }
        };

    }, []);

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <div>Sender: {msg.sender}</div>
                        <div>Message: {msg.content}</div>
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