import React, { useEffect, useState } from "react";
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
import db from '../firebase';
// import db from '../config/firebase';
// import firebase from 'firebase';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log(snapshot)
    });
  }, []);

  console.log(rooms);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix" />

        <div className="sidebar-header-icons">
          <IconButton>
            <GroupsIcon />
          </IconButton>

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon ></ChatIcon>
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
        <SidebarChat addNewChat />
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
