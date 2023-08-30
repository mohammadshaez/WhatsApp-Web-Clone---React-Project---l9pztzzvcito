import React, { useEffect, useState, useDispatch } from "react";
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
import { Menu } from "@mui/base/Menu";
// import { MenuButton } from "@mui/base/MenuButton";
// import { MenuItem } from "@mui/base/MenuItem";
// import { Dropdown } from "@mui/base/Dropdown";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  // creating a collection
  // setting doc id to rooms
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  //adding new collection
  const createNewChat = () => {
    const room = prompt("Create new chat");
    if (room) {
      db.collection("rooms").add({
        name: room.toString(),
      });
    }
  };
  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    firebase.auth().signOut();
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}

      <div className="sidebar-header">
        <Avatar src={user?.photoURL} onClick={handleLogout} />

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
          {/* <Dropdown>
            <MenuButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </MenuButton>
            <Menu>
              <MenuItem>My account</MenuItem>
              <MenuItem>Notification preferences</MenuItem>
            </Menu>
          </Dropdown> */}
        </div>
      </div>

      {/* Search Bar  */}

      <div className="searchbar">
        <div className="searchbar-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <FilterListIcon sx={{ marginLeft: "10px" }} />
      </div>

      {/* Sidebar Chats */}

      <div className="sidebar-sidebar-chats">
        {rooms
          .filter((room) =>
            room.data.name.toLowerCase().includes(input.toLowerCase())
          )
          .map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
