import React, { useEffect, useRef, useState } from 'react';
import ChatUserComponent from './ChatUserComponent';
import ChatBody from './ChatBody';
import ChatBox from './ChatBox';


const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatUserComponent socket={socket}/>
      <div className="w-screen flex flex-col justify-between">
        <ChatBody 
        messages={messages} 
        lastMessageRef={lastMessageRef} 
        typingStatus={typingStatus}
        />
        <ChatBox socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;