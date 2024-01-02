import React, { useEffect, useState } from 'react'

const ChatSidebar = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users])
    
    return (
        <div className="bg-violet-200 rounded-tl-3xl rounded-bl-3xl px-10 py-5 shadow-sm text-center">
          <h2 className='text-4xl text-violet-800 bg-gray-100 px-10 py-2 rounded-xl uppercase'>ChatBot</h2>
          <div>
            <h4 className="mt-10 mb-4 py-1 text-gray-100 bg-violet-600 rounded-lg">ACTIVE USERS</h4>
            <div className="m-2 bg-gray-100 rounded-lg">
            {users.map((user) => (
            <p className='p-1 capitalize' key={user.socketID}>{user.userName}</p>
          ))}
            </div>
          </div>
        </div>
      );
    };

export default ChatSidebar;