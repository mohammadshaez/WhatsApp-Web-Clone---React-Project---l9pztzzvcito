import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { db } from "../firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{user}] = useStateValue();

  // creating a collection 
  // setting doc id to rooms
  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot=> {
      setRooms(snapshot.docs.map(doc=> ({
        id: doc.id,
        data : doc.data(),
      })))
    })
  }, [])
  
  //adding new collection 
  const createNewChat = () => {
    const room = prompt("Create new chat");
    if(room) {
      db.collection('rooms').add({
        name : room.toString(),
      })
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user?.photoURL} onClick={e => firebase.auth().signOut()}/>

        <div className="sidebar-header-icons">
          <IconButton>
            <GroupsIcon />
          </IconButton>

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton onClick={createNewChat}>
            <ChatIcon></ChatIcon>
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
        {
          rooms.map(room => {
            return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;
