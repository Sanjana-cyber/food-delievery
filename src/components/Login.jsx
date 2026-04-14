import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import { Mail, Lock, Phone, UtensilsCrossed } from "lucide-react";
import "./style.css";


function Login() {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState("login");
  const [loginMethod, setLoginMethod] = useState("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userConfirmation, setUserConfirmation] = useState(null);

  // ================= EMAIL LOGIN =================
  const handleEmailAction = async (e) => {
    e.preventDefault();
    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful");
      }

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= PHONE LOGIN =================
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, "+91" + phone, recaptcha);
      setUserConfirmation(confirmation);
      alert("OTP sent!");
    } catch {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await userConfirmation.confirm(otp);
      alert("Login successful!");
      navigate("/home");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <>
   <div className="login-page">
      {/* BACKGROUND BLOBS */}
      <div className="blobs">
        <div className="blob blob-a"></div>
        <div className="blob blob-b"></div>
        <div className="blob blob-c"></div>
      </div>

      {/* CENTER CONTENT */}
      <div className="page-center">

        {/* PREMIUM TITLE */}
        <h1 className="hero-title">
          Welcome to Sethy Burger Shop
        </h1>
        <p className="hero-sub">
          Premium Burger Experience
        </p>

        {/* LOGIN CARD */}
        <div className="login-card">

          {/* HEADER */}
          <div className="card-header">
            <div className="card-icon">
              <UtensilsCrossed />
            </div>
            <h2 className="card-title">
              {authMode === "login" ? "Login" : "Create Account"}
            </h2>
            <p className="card-subtitle">
              Enter your details to continue
            </p>
          </div>

          {/* FORM AREA */}
          {loginMethod === "email" ? (
            <form onSubmit={handleEmailAction}>

              {/* EMAIL */}
              <div className="form-group">
                <label className="field-label">Email</label>
                <div className="field-wrap">
                  <Mail className="field-icon" />
                  <input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <Lock className="field-icon" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn-login">
                {authMode === "login" ? "Login" : "Signup"}
              </button>
            </form>
          ) : (
            <div>

              {/* PHONE */}
              <div className="form-group">
                <label className="field-label">Phone</label>
                <div className="field-wrap">
                  <Phone className="field-icon" />
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {!userConfirmation ? (
                <>
                  <div id="recaptcha"></div>
                  <button className="btn-login" onClick={sendOtp}>
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="field-label">OTP</label>
                    <div className="field-wrap">
                      <Lock className="field-icon" />
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn-login" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          )}

          {/* DIVIDER */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button className="btn-google" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          {/* FOOTER */}
          <div className="card-footer">
            <p className="footer-text">
              {authMode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className="footer-link"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "signup" : "login")
                }
              >
                {authMode === "login" ? "Signup" : "Login"}
              </span>
            </p>

            <p className="footer-text" style={{ marginTop: "6px" }}>
              <span
                className="footer-link"
                onClick={() =>
                  setLoginMethod(loginMethod === "email" ? "phone" : "email")
                }
              >
                {loginMethod === "email"
                  ? "Use Phone instead"
                  : "Use Email instead"}
              </span>
            </p>
          </div>

        </div>
      </div></div>
    </>
  );
}

export default Login;
