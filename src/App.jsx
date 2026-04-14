import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PhoneAuth from "./components/Phone";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/phone" element={!user ? <PhoneAuth /> : <Navigate to="/home" />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />}>
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
