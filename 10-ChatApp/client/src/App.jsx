import { useEffect, useState } from "react";
import JoinGroup from "./components/JoinGroup";
import ChatRoom from "./components/ChatRoom";
import "./App.css";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";

let socket;

function App() {
  const [joined, setJoined] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", room: "" });

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoin = ({ username, room }) => {
    setUserInfo({ username, room });
    if (socket) {
      socket.emit("join", room);
    }
    setJoined(true);
  };

  const handleLeave = () => {
    setUserInfo({ username: "", room: "" });
    setJoined(false);
  };

  return (
    <>
      {!joined ? (
        <JoinGroup onJoin={handleJoin} />
      ) : (
        <ChatRoom
          username={userInfo.username}
          room={userInfo.room}
          socket={socket}
          onLeave={handleLeave}
        />
      )}
    </>
  );
}

export default App;
