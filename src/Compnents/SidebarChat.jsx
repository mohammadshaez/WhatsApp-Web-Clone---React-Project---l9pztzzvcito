import { Avatar } from "@mui/material";
import React from "react";
import "./Sidebar.css";

const SidebarChat = ({ addNewChat }) => {
  return !addNewChat ? (
    <div className="sidebar-chat">
      <div className="chat-message">
        <Avatar src="https://api.dicebear.com/6.x/bottts/svg"/>
        <div className="sidebar-chat-info">
          <h2>Senders Name</h2>
          <h5>Last Message</h5>
        </div>
      </div>
    </div>
  ) : (
    <div className="sidebar-chat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
