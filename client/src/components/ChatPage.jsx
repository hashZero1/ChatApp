import React, { useEffect, useRef, useState } from 'react';
import ChatBody from './ChatBody';
import ChatBox from './ChatBox';
import ChatSidebar from './ChatSidebar';


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
    <div className="flex h-screen bg-violet-400 p-4 ">
      <ChatSidebar socket={socket}/>
      <div className="w-screen flex flex-col justify-between bg-gray-100 rounded-tr-3xl rounded-br-3xl shadow-md ">
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