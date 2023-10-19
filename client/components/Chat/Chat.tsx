import { Message } from '@/service/Types'
import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'


const Chat = () => {
    
    const [client, setClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
      };

      const handleSendMessage = () => {
        if (client && input) {
          const message = { content: input };
          client.publish({
            destination: '/app/chat/sendMessage',
            body: JSON.stringify(message),
          });
          setInput('');
        }
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
        <input type='text' value={input} onChange={handleMessageInput}/>
        {message}
    </div>
  )
}

export default Chat