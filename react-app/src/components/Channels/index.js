import React from 'react'
import { useSelector } from 'react-redux'
import CreateChannelForm from '../CreateChannelForm'

const Channels = ({ channels }) => {
    // channels = useSelector(state => state.channels)
    return (
        <div>
            <h2>Channels</h2>
            <div><CreateChannelForm /></div>
        </div>
    )
}

export default Channels
