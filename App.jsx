import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <>
      {!role && <Navbar setPage={setPage} />}

      {!role && page === "home" && <Home setPage={setPage} />}
      {!role && page === "login" && (
        <Login
          setRole={(userRole, id) => {
            setRole(userRole);
            setUserId(id);
            setPage("dashboard");
          }}
        />
      )}

      {role && <Dashboard role={role} userId={userId} />}
    </>
  );
}
