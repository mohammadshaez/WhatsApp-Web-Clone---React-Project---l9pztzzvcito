import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBox.css";
import { db, storage } from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import VideoCallIcon from "@mui/icons-material/VideoCall";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
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

const ChatBox = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  // const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  // const [currentEmoji, setCurrentEmoji] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // set images
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * 30) + 1,
    [roomId]
  );
  const imageUrl = useMemo(
    () =>
      `https://xsgames.co/randomusers/assets/avatars/male/${randomNumber}.jpg`,
    [randomNumber]
  );

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data()?.name);

          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        });
    }
  }, [roomId]);

  //add collection
  const sendMessage = (e) => {
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        name: user.displayName,
        message: input || selectedFile.name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  const time = useMemo(() => {
    if (messages.length > 0) {
      return new Date(
        messages[messages.length - 1]?.timestamp?.seconds * 1000
      ).toLocaleTimeString();
    }
    return "";
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  if (selectedFile) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(selectedFile.name);

    fileRef.put(selectedFile).then(() => {
      console.log("File uploaded successfully!");
    });
    sendMessage();
    setSelectedFile(null);
  }
  // console.log(selectedFile);

  //dropdown
  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "New Group":
        // createNewChat();
        console.log("working");
        return;
      case "Log Out":
        // handleLogout();
        return;
      default:
        alert("We are working on it !!!");
    }
  };
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchInput("");
  };
  return (
    <div className="chat-box">
      {/* Chat-box Header  */}

      <div className="chat-header">
        <Avatar src={imageUrl} />
        <div className="chat-header-info">
          <div className="chat-header-roomname">
            <h3>{roomName}</h3>
          </div>
          <h5>{time}</h5>
        </div>
        <div className="chat-header-icon">
          {isSearchActive ? (
            <div className="chat-header-search-wrapper">
              <input
                type="text"
                value={searchInput}
                placeholder="Search Message"
                onChange={(e) => setSearchInput(e.target.value)}
                className="chat-header-search"
              />
            </div>
          ) : null}
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <Dropdown>
            <TriggerButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </TriggerButton>

            {/* Menu */}
            <Menu slots={{ listbox: StyledListbox }}>
              <StyledMenuItem onClick={() => handleMenuClick("Group Info")}>
                Group Info
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleMenuClick("Select Messages")}
              >
                Select Messages
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleMenuClick("Mute Notifications")}
              >
                Mute Notifications
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("Clear Messages")}>
                Clear Messages
              </StyledMenuItem>
              <StyledMenuItem onClick={() => handleMenuClick("Exit Group")}>
                Exit Group
              </StyledMenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>

      {/* Chat Body */}

      <div className="chatbox-body">
        {messages
          .filter((message) =>
            message.message.toLowerCase().includes(searchInput)
          )
          .map((message, index) => (
            <div className="chat-body" key={index}>
              <span className="avatar">
                {user.displayName !== message.name && <Avatar src={imageUrl} />}
              </span>
              <span
                className={`chat-message-body ${
                  user.displayName === message.name && "chat-received"
                }`}
              >
                <p className="chat-name">~{message.name}</p>
                <p className="chat-message">
                  {message.message}{" "}
                  <span className="chat-time">
                    {new Date(
                      message.timestamp?.seconds * 1000
                    ).toLocaleTimeString()}
                  </span>
                </p>
              </span>
            </div>
          ))}
      </div>

      {/* Chat-box Footer */}

      <div className="chat-footer">
        {/* <IconButton onClick={() => setIsEmojiPicker(!isEmojiPicker)}> */}
        <IconButton>
          <TagFacesIcon />
        </IconButton>
        {/* {isEmojiPicker && (
          <div>
            <Picker
              data={data}
              // previewPosition="none"
              onEmojiSelect={(e) => {
                setCurrentEmoji(e.native);
                setIsEmojiPicker(!isEmojiPicker);
              }}
            />
          </div>
        )} */}

        <IconButton
          onClick={() => document.getElementById("fileInput").click()}
        >
          <AttachFileIcon />
        </IconButton>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
        {input ? (
          <IconButton type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        ) : (
          <IconButton>
            <MicIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
