import React from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
  const newchat = () => { alert("new chat")}
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"/>

        <div className="sidebar-header-right">
          <IconButton>
            <GroupsIcon />
          </IconButton>

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon onClick={newchat}>
            </ChatIcon>
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="searchbar">
        <div className="searchbar-container">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
        <FilterListIcon sx={{ marginLeft: "10px" }} />
      </div>
      <div className="sidebar-sidebar-chats">
        <SidebarChat addNewChat/>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
