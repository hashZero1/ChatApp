import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatLoginComponent = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleChange = (e) =>{
    setUserName(e.target.value)
  }
    //sends the username and socket ID to the Node.js server
    const handleSubmit = (e) => {
      e.preventDefault()
      localStorage.setItem("userName", userName)
      socket.emit("newUser", {userName, socketID: socket.id})
      navigate("/chat")
  }
  
  return (
    <form className='mx-auto py-5 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600 via-violet-300 to-orange-400 h-screen' onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-10 p-4 lg:p-6 lg:text-5xl rounded-xl w-4/5 lg:w-2/3 mx-auto bg-violet-800 text-white uppercase text-center">Sign in to Open Chat</h2>
      <label className='m-2 text-xl ' htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="px-4  py-2 lg:px-5 lg:py-3 lg:w-1/3  text-xl lg:text-2xl bg-white rounded-tl-lg rounded-bl-lg"
        value={userName}
        onChange={handleChange}
        required
      />
      <button className="px-4 py-2 lg:px-5 lg:py-3 text-xl bg-orange-400 text-white font-semibold hover:bg-gray-800 hover:text-white lg:text-2xl rounded-tr-lg rounded-br-lg">SIGN IN</button>
    </form>
  );
};

export default ChatLoginComponent;