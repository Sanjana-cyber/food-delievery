import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Admin from "./components/Admin";
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

  // 👑 Admin check
  const isAdmin =
    user && user.email === "sanjanapandey29256@gmail.com";

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !user ? (
              <Signup />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/phone"
          element={
            !user ? (
              <PhoneAuth />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* 🔒 User Route */}
        <Route
          path="/home"
          element={
            user && !isAdmin ? (
              <Home />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 🔒 Admin Route */}
        <Route
          path="/admin"
          element={
            user && isAdmin ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
