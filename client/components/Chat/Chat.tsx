import { Message } from '@/service/Types'
import { Client, IMessage } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'


const Chat = () => {

    const [client, setClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (client && input) {
            //Pass in user here and set the name as user.name
            const message = { sender: "user", content: input, timestamp: new Date() };
            client.publish({
                destination: '/app/chat/sendMessage',
                body: JSON.stringify(message),
            });
            setInput('');
        }
    };

    const onMessageReceived = (message: IMessage) => {
        // const newMessages = [...messages, message];
        //setMessages([...messages, message]);
        const newMessage = JSON.parse(message.body);
        setMessages([...messages, newMessage]);
    };

    useEffect(() => {
        const newClient = new Client({
            brokerURL: "ws://localhost:8080/w",
        });
        newClient.activate();
        newClient.onConnect = () => {
            console.log("Connected")
            newClient.subscribe("/topic/chatrooms", (message) => {
                onMessageReceived(message);
                setMessage(message.body)
                console.log(message)
            });
        },


            setClient(newClient);

        return () => {
            if (newClient) {
                newClient.deactivate();
            }
        };

    }, [client]);

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