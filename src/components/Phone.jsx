import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const[user,setUser]=useState(null)
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();


   // 📲 Send OTP
const sendOtp=async()=>{
    try{ const recaptcha= new RecaptchaVerifier(auth,"recaptcha",{})
          const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + phone, // ✅ FIXED
        recaptcha
      );
      setUser(confirmation); // ✅ VERY IMPORTANT
      console.log("OTP SENT:", confirmation);

      alert("OTP sent!");

    console.log(confirmation)}
    catch(err){
        console.error(err)
    }
   
   
}
 
  

  // 🔢 Verify OTP
  const verifyOtp = async () => {
  
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const data=await user.confirm(otp)
      console.log(data)
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert("Invalid OTP");
    }
     
  };

  // ✅ RETURN UI (THIS WAS MISSING)
  return (
    <div>
      <h2>Phone Login</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <div id="recaptcha"></div>

      <button onClick={sendOtp}>Send OTP</button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}

export default PhoneAuth;