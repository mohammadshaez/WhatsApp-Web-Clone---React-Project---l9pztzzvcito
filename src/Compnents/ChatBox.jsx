import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatBox = () => {
  return (
    <div className='chat-box'>
        <div className="chat-header">
            <Avatar/>
            <div className="chat-header-info">
                <h2>Group name</h2>
                <h5>Last seen</h5>
            </div>
            <div className="chat-header-icon">
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default ChatBox