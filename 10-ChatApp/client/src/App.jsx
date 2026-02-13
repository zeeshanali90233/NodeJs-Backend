import { useEffect, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import "./App.css";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";

let socket;

function App() {
  const [joined, setJoined] = useState(false);

  // User Form Fields
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

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

  const handleLeave = () => {
    setUsername("");
    setRoom("");
    setJoined(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("join", room);
    }
    setJoined(true);
  };
  return (
    <>
      {joined == false ? (
        <div className="join-group-container">
          <h2 style={{ color: "black" }}>Join a Chat Group</h2>
          <form className="join-group-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Group Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </div>
      ) : (
        <ChatRoom
          username={username}
          room={room}
          socket={socket}
          onLeave={handleLeave}
        />
      )}
    </>
  );
}

export default App;
