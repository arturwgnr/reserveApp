export default function Dashboard() {
  const user = localStorage.getItem("user");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome <strong>{user}!</strong>
      </p>
    </div>
  );
}
