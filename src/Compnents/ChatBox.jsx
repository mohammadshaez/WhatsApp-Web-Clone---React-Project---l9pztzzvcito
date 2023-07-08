import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBox.css";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

const ChatBox = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const randomNumber = useMemo(() => Math.floor(Math.random() * 30) + 1, [roomId]);
  const imageUrl = useMemo(() => `https://xsgames.co/randomusers/assets/avatars/male/${randomNumber}.jpg`, [randomNumber]);
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

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: input,
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

  return (
    <div className="chat-box">
      {/* Chat-box Header  */}

      <div className="chat-header">
        <Avatar src={imageUrl}/>
        <div className="chat-header-info">
          <h3>{roomName}</h3>
          <h5>{time}</h5>
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

      {/* Chat Body */}

      <div className="chatbox-body">
        <div className="chat-body">
          <span className="avatar">
            <Avatar src={imageUrl} />
          </span>
          <span className="chat-message-body">
            <p className="chat-name">~Sender's Name </p>
            <p className="chat-message">
              Hello world
              <span className="chat-time">12:00 am</span>
            </p>
          </span>
        </div>

        {messages.map((message, index) => (
          <div className="chat-body" key={index}>
            <span className="avatar"></span>
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
        <IconButton>
          <TagFacesIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {input ? (
          <IconButton onClick={sendMessage}>
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
