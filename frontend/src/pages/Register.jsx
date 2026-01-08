import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeated, setRepeated] = useState("");

  async function handleRegister() {
    try {
      if (email === "" || password === "") {
        return window.alert("Fill information");
      }

      if (password !== repeated) {
        return window.alert("Passwords must match!");
      }

      const res = await axios.post("http://localhost:3000/api/register", {
        email,
        password,
      });

      setEmail("");
      setPassword("");

      nav("/login");

      window.alert("Register successfull");

      console.log(res);
    } catch (error) {
      window.alert("Error during Register");
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Welcome to Register</h1>

      <div className="input-area">
        <p>Email:</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Insert email"
        />

        <p>Password:</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Insert password"
        />

        <p>Repeat password:</p>
        <input
          value={repeated}
          onChange={(e) => setRepeated(e.target.value)}
          type="password"
          placeholder="Insert password"
        />
        <br />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
