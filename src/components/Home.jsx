

import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h2>home</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}






export default Home
