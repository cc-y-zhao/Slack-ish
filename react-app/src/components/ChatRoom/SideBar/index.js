import React from 'react'
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
                        {/* Expand more icon  */}
                        <h4>Channels</h4>
                        {/* Add Channel icon */}
                    </div>
                </div>

                <div className="sidebar__channelsList">
                    {/* Channels */}
                </div>
                
                <div className="sidebar__messages">
                    <div className="sidebar__messagesHeader">
                        <div className="sidebar__header">
                            {/* Expand more icon  */}
                            <h4>Direct messages</h4>
                            {/* Add Channel icon */}
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
