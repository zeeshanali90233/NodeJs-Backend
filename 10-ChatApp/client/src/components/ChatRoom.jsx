import { useEffect, useState } from "react";

const ChatRoom = ({ username, room, socket, onLeave }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg) => {
      console.log("New message received:", msg);
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send", { text: message, room: room, username: username });
      setMessages((prev) => [...prev, { text: message, room, username }]);

      setMessage("");
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2>Room: {room}</h2>
        <button className="leave-btn" onClick={onLeave}>
          Leave
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message${msg.username === username ? " own" : ""}`}
          >
            <span className="chat-username">{msg.username}:</span>{" "}
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
