import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      setEmail("");
      setPassword("");

      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.message);

      nav("/dashboard");
      window.alert("Login successfull");
    } catch (error) {
      window.alert("Error during login");

      setEmail("");
      setPassword("");
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Welcome to Login</h1>

      <div className="input-area">
        <p>email:</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Insert email"
        />

        <p>password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Insert password"
        />
        <br />

        <button onClick={handleLogin}>Acess</button>
      </div>
    </div>
  );
}
