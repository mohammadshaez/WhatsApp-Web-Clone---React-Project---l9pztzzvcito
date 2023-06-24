import React from "react";
import './App.css'
import Sidebar from "./Compnents/Sidebar";
import ChatBox from "./Compnents/ChatBox";

const App = () => {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  );
};

export default App;
