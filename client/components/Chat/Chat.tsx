import { Message } from '@/service/Types'
import { Client } from '@stomp/stompjs';
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
    
    const onMessageReceived = (message: Message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      };

    useEffect(() => {
        const newClient = new Client({
            brokerURL: "ws://localhost:8080/w",
            onConnect: () => {
                console.log("Connected")
                newClient.subscribe("/topic/chatrooms", (message) => {
                    setMessage(message.body)
                    console.log(message)
                });
            },            
        });

        setClient(newClient);
        newClient.activate();
    });

  return (
    <div>
        <input 
        type='text' 
        placeholder="Type your message"
        value={input} 
        onChange={handleMessageInput}/>
        <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default Chat