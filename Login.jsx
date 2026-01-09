import { useState } from "react";

export default function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username || !password) { alert("Please fill all fields"); return; }

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) setRole(data.role, data.user_id);
    else alert("Invalid credentials");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Login to Library</h2>
        <input type="text" placeholder="Username" className="border w-full p-2 mb-4 rounded" onChange={e=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border w-full p-2 mb-6 rounded" onChange={e=>setPassword(e.target.value)} />
        <button onClick={login} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">Login</button>
      </div>
    </div>
  );
}
