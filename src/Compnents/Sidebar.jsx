import { useEffect, useState, useDispatch } from "react";
import * as React from "react";
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
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { Dropdown } from "@mui/base/Dropdown";
import { styled } from "@mui/system";

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #d0d7de;
  color: #24292f;
  box-shadow: 0px 4px 30px #d0d7de;
  z-index: 1;
  `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 10px;
  // border-radius: 8px;
  cursor: pointer;
  user-select: none;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background-color: #FFEEF4;
  }
  `
);

const TriggerButton = styled(MenuButton)(
  ({ theme }) => `
  border: none
  `
);

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

  // handle Drop Down Menu / MUI

  const handleMenuClick = (menuItem) => {
    // if(menuItem === "New Group") {
    //   createNewChat();
    // }
    switch (menuItem) {
      case "New Group":
        createNewChat();
        console.log("working");
        return;
      case "Log Out":
        handleLogout();
        return;
      default:
        alert("We are working on it !!!");
    }
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}

      <div className="sidebar-header">
        <Avatar src={user?.photoURL} />

        <div className="sidebar-header-icons">
          <IconButton onClick={() => alert("We are working on it !!!")}>
            <GroupsIcon />
          </IconButton>

          <IconButton onClick={() => alert("We are working on it !!!")}>
            <DonutLargeIcon />
          </IconButton>

          <IconButton onClick={createNewChat}>
            <ChatIcon></ChatIcon>
          </IconButton>

          <Dropdown>
            <TriggerButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </TriggerButton>  
            <Menu
              slots={{ listbox: StyledListbox }}
            >
              <StyledMenuItem onClick={() => handleMenuClick("New Group")}>
                New Group
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("New Community")}>
                New Community
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleMenuClick("Starred Messages")}
              >
                Starred Messages
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("Select Chats")}>
                Select Chats
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("Settings")}>
                Settings
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("Log Out")}>
                Log Out
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleMenuClick("Get Whatsapp for Windows")}
              >
                Get Whatsapp for Windows
              </StyledMenuItem>
            </Menu>
          </Dropdown>
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
