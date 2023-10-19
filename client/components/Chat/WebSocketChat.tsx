import React, { useState, useEffect, useRef } from 'react';
import Stomp from 'stompjs';



function WebSocketChat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState('');
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const chatOutputRef = useRef<HTMLDivElement | null>(null);
  const [stompClient, setStompClient] = useState<Stomp.Client>();

  
  useEffect(() => {
    const initializeWebSocketConnection = () => {
      const socket = new WebSocket('ws://localhost:8080/w');
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/chat', (message) => {
          const newMessage = JSON.parse(message.body).message;
          setChat((prevChat) => prevChat + newMessage + '\n');
        });

        // Set the stompClient in the component state
        setStompClient(stompClient);
      });
    };

    initializeWebSocketConnection();
  }, []);

  const sendMessage = () => {
    const newMessage =messageInputRef.current?.value;
    if (newMessage  && messageInputRef.current ) {
      stompClient?.send('/app/chat', {}, JSON.stringify({ message: newMessage }));
      messageInputRef.current.value = '';
    }
  };


  return (
    <div>
      <div>
        <div>
          <input type="text" ref={messageInputRef} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div ref={chatOutputRef} style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px' }}>
          {chat}
        </div>
      </div>
    </div>
  );
}

export default WebSocketChat;