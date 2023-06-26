import { Avatar, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import MicIcon from "@mui/icons-material/Mic";
import "./Chatbox.css";
const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-header">
      <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"/>
        <div className="chat-header-info">
          <h3>Group name</h3>
          <h5>Last seen</h5>
        </div>
        <div className="chat-header-icon">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbox-body">
        <div className="chat-body">
          <span className="avatar">
          <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"/>
          </span>
          <span className="chat-message-body">
            <p className="chat-name">~Mohammad Shaez </p>
            <p className="chat-message">
              This is a message. <span className="chat-time">12:00 am</span>
            </p>
          </span>
        </div>

        <div className="chat-body ">
          <span className="avatar">
          <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"/>
          </span>
          <span className="chat-message-body chat-received">
            <p className="chat-name">~Mohammad Shaez </p>
            <p className="chat-message">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              officiis commodi praesentium harum, veritatis obcaecati corporis
              incidunt aut vero voluptatem tempore! Est exercitationem saepe
              odit, deserunt error et recusandae id.{" "}
              <span className="chat-time">12:00 am</span>
            </p>
          </span>
        </div>

        <div className="chat-body">
          <span className="avatar">
            <Avatar src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"/>
          </span>
          <span className="chat-message-body">
            <p className="chat-name">~Mohammad Shaez </p>
            <p className="chat-message">
              This is a message. <span className="chat-time">12:00 am</span>
            </p>
          </span>
        </div>
      </div>

      <div className="chat-footer">
        <IconButton>
          <TagFacesIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
          />
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatBox;
