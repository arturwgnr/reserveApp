import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div>
      <h1>Landing </h1>
      <button onClick={() => nav("/login")}>Login</button>
      <button onClick={() => nav("/register")}>Register</button>
    </div>
  );
}
