
import React, { useState } from 'react';

const JoinGroup = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onJoin({ username, room });
    }
  };

  return (
    <div className="join-group-container">
      <h2 style={{color:"black"}}>Join a Chat Group</h2>
      <form className="join-group-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Group Name"
          value={room}
          onChange={e => setRoom(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default JoinGroup;