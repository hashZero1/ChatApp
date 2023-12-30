import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client'
import ChatPage from './components/ChatPage';
import ChatLoginComponent from './components/ChatLoginComponent';

const socket = io.connect("http://localhost:5001")
const Routers = () =>{
    return(
    <Routes>
        <Route path='/' element={<ChatLoginComponent socket={socket}/>}/>
        <Route path='/chat' element={<ChatPage socket={socket}/>}/>
    </Routes>
    )
}

export default Routers;