import { Avatar } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import 'firebase/firestore';

const SidebarChat = ({ id, name }) => {
  const [lastMessage, setLastMessage] = useState("");
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * 30) + 1,
    [id]
  );
  const imageUrl = useMemo(
    () =>
      `https://xsgames.co/randomusers/assets/avatars/male/${randomNumber}.jpg`,
    [randomNumber]
  );
  
  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);
  return (
    <>
      <Link
        to={`/rooms/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="sidebar-chat">
          <div className="chat-message">
            <Avatar src={imageUrl} />
            <div className="sidebar-chat-info">
              <h3>{name}</h3>
              <h5>{lastMessage[0]?.message}</h5>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SidebarChat;
