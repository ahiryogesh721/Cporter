'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email?: string;
  accessToken?: string;
  profilePic?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <img src={user.profilePic} alt="profile" width="100" />
          <p>Email: {user.email}</p>
          <p>Access Token: <b>{user.accessToken}</b></p>
          <button onClick={() => axios.get("http://localhost:5000/auth/logout").then(() => setUser(null))}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
