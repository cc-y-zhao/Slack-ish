import React from 'react'
import Chat from './Chat'
import SideBar from './SideBar'
import './ChatRoom.css'
const ChatRoom = () => {
  return (
    <div className='chatroom'>
        <SideBar />
        <Chat />
    </div>
  )
}

export default ChatRoom
