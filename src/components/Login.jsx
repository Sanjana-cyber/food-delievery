import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Role logic (temporary)
      const role = email === "sanjanapandey29256@gmail.com" ? "admin" : "user";

      localStorage.setItem("user", JSON.stringify({ email, role }));

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      alert(error.message);
    }
  };
  //handle google login
  const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const email = result.user.email;

    const role = email === "sanjanapandey29256@gmail.com" ? "admin" : "user";

    localStorage.setItem("user", JSON.stringify({ email, role }));

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }

  } catch (error) {
    alert(error.message);
  }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button type="submit">Login</button>
      <br></br>
      <button onClick={handleGoogleLogin}>
  Login with Google
</button>
<p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p>
  <Link to="/phone">Login with Phone</Link>
</p>

    </form>
  );
}

export default Login;
