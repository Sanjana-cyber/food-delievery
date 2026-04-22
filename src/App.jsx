import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Order from "./components/Order";
import Review from "./components/Review";
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
    <HashRouter>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/phone" element={!user ? <PhoneAuth /> : <Navigate to="/home" />} />

        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/menu" element={user ? <Menu /> : <Navigate to="/" />} />
        <Route path="/order" element={user ? <Order /> : <Navigate to="/" />} />
        <Route path="/reviews" element={user ? <Review /> : <Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;