import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import CreateChannelForm from '../CreateChannelForm';

import { loadChannels } from '../../store/channels';

const Channels = () => {
    const channels = useSelector(state => Object.values(state.channels))
    const owner_id = useSelector(state => (state.session.user.id))

    const dispatch = useDispatch()

    console.log("channels in channels/index.js-------", channels)

    useEffect(() => {
        dispatch(loadChannels(owner_id));
    }, [channels.toString()]);

    // TO DO: add individual routes for each channel with below syntax:
    // <NavLink key={channel.id} to={'/channels/' + channel.id}>

    return (
        <div>
            <h2>Channels</h2>
            <div><CreateChannelForm /></div>
            <div>Channels list will go here</div>
            <div>
                {channels.map((channel) => {
                    return (
                        <div key={channel.id}>
                            <div>{channel.title}</div>
                        </div>
                    );
                }
                )}
            </div>
        </div>
    )
}

export default Channels
