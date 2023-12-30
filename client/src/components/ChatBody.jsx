import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChatBody = ({messages, lastMessageRef, typingStatus}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };
  
  return (
    <section className=''>
      <header className="bg-orange-100 flex justify-between p-4">
        <h1 className='text-2xl text-gray-800'>Hangout with Colleagues</h1>
        <button className="px-4 py-2 lg:px-5 lg:py-3 text-lg bg-orange-400 text-white font-semibold hover:bg-gray-800 hover:text-white lg:text-lg rounded-lg " onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      {/*This shows messages sent from you*/}
      <div className=" m-4 text-xl text-gray-900">
      {messages.map(message => (
            message.name === localStorage.getItem("userName") ? (
              <div className="text-right bg-gray-200 capitalize m-2  rounded-2xl" key={message.id}>
            <p className='text-sm bg-orange-200 capitalize rounded-tr-xl rounded-tl-xl p-1'>{message.name}</p>
            <div className='p-2 mr-4'>
                <p>{message.text}</p>
            </div>
          </div>
            ): (
              <div className="text-left bg-gray-200 capitalize m-2 rounded-2xl" key={message.id}>
            <p className='text-sm bg-orange-200 capitalize rounded-tr-xl rounded-tl-xl p-1'>{message.name}</p>
            <div className='p-2'>
                <p>{message.text}</p>
            </div>
          </div>
            )
            ))}
        {/*This is triggered when a user is typing*/}
        <div className='m-3 w-40 rounded-xl px-2 py-1 text-sm bg-gray-200 capitalize'>
            <p>{typingStatus}...</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </section>
  );
};


export default ChatBody