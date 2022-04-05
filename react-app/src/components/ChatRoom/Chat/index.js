import React from 'react'
import './Chat.css'

const Chat = () => {
  return (
    <div className="chat">c
    {/* <ChatHeader /> */}

    <div className="chat__messages">
      {/* <Message /> */}
    </div>

    <div className="chat__input">
      <form>
        <input placeholder='Send message' />
      </form>

      <div className="chat_submitIcon">
        {/* change to an icon later */}
        <button className='chat__submitButton' type='submit'>Send Message</button>
      </div>
    </div>
  </div>
  )
}

export default Chat
