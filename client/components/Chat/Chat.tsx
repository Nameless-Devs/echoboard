import { Message } from '@/service/Types'
import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'


const Chat: React.FC<Message> = ({ id, sender, content}) => {
    
    const [client, setClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    const [input, setinput] = useState<string>('');

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
        <input type='text' value={input} onChange={(e) => setinput(e.target.value)}/>
    </div>
  )
}

export default Chat