import React, { useEffect, useState } from "react";

const Channel = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="channel-page">
      <h2>{user.firstName} {user.lastName}'s Channel</h2>
      <p>User ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>Other channel-related details can go here...</p>
    </div>
  );
};

export default Channel;
