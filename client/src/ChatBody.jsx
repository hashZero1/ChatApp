import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avvvatars from 'avvvatars-react'

const ChatBody = ({messages, lastMessageRef, typingStatus}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };
  
  return (
    <section>
      <header className="bg-violet-200 flex justify-between  p-5 rounded-tr-3xl ">
        <h1 className='text-2xl bg-white py-2 px-4 rounded-lg text-gray-800'>Hangout with Colleagues</h1>
        <button className="px-4 py-2 lg:px-5 lg:py-3 text-lg bg-orange-400 text-white font-semibold hover:bg-gray-800 hover:text-white lg:text-lg rounded-lg " onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      {/*This shows messages sent from you*/}
      <div className="mx-8 my-4 text-xl text-gray-900">
      {messages.map(message => (
            message.name === localStorage.getItem("userName") ? (
              <div className="flex justify-end  capitalize m-2  rounded-2xl" key={message.id}>
            <div className='p-3 mr-1 bg-gray-200 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl'>
                <p>{message.text}</p>
            </div>
            <div className='p-2 mr-4'>
            {/* <p className='text-sm'>{message.name}</p> */}
            <Avvvatars size={40} value={message.name} border={true} borderSize={2}/>
            </div>
          </div>
            ): (
              <div className="flex justify-end flex-row-reverse  capitalize m-2  rounded-2xl" key={message.id}>
              <div className='p-3 mr-1 bg-gray-200 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl'>
                  <p>{message.text}</p>
              </div>
              <div className='p-2'>
              {/* <p className='text-sm'>{message.name}</p> */}
              <Avvvatars size={40} value={message.name}  border={true} borderSize={2} />
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


export default ChatBody;