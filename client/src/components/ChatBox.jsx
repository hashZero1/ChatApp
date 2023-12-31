import React, { useState } from 'react'

const ChatBox = ({socket}) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)


    const handleSendMessage = (e) => {
      e.preventDefault()
      socket.emit("message", 
          {
          text: message, 
          name: localStorage.getItem("userName"), 
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id
          }
      )
      setMessage("")
  }

    return (
      <div className="bg-violet-200 p-4 shadow-sm rounded-br-3xl">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="px-4 py-2 lg:px-5 lg:py-3 w-3/4 lg:w-11/12 text-xl lg:text-2xl bg-white rounded-tl-lg rounded-bl-lg"
            value={message}
            onChange={handleChange}
            onKeyDown={handleTyping}
          />
          <button className="px-4 py-2 lg:px-5 lg:py-3 text-xl bg-orange-400 text-white font-semibold hover:bg-gray-800 hover:text-white lg:text-2xl rounded-tr-lg rounded-br-lg">SEND</button>
        </form>
      </div>
    );
  };

export default ChatBox;