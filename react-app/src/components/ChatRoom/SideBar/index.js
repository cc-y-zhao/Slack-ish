import React from 'react'
import Channels from '../../Channels'
import './SideBar.css'
const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <h3>Slack-ish</h3>
                {/* Expan more icon  */}
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelHeader">
                    <div className="sidebar__header">
                        <i class="fa-solid fa-caret-down"></i>
                        <h4>Channels</h4>

                        <div className='sidebar__channelButton'>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>

                <div className="sidebar__channelsList">
                    <Channels />
                </div>

                <div className="sidebar__messages">
                    <div className="sidebar__messagesHeader">
                        <div className="sidebar__header">
                            <i class="fa-solid fa-caret-down"></i>
                            <h4>Direct messages</h4>
                            <div className='sidebar__messageButton'>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="sidebar__channelsList">
                    {/* User names */}
                </div>
            </div>
        </div>
    )
}

export default SideBar
