import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import Membership from "./Membership";
import Reports from "./Reports";

export default function AdminDashboard() {
  const [section, setSection] = useState("Dashboard");
  const [stats, setStats] = useState({
    total_books: 0,
    issued_books: 0,
    total_users: 0,
    pending_fines: 0,
  });

  useEffect(() => {
    if (section !== "Dashboard") return;

    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/stats");
        if (!res.ok) throw new Error("Failed to load admin stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [section]);

  return (
    <div className="flex">
      <Sidebar setSection={setSection} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {section === "Dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Welcome, Admin 👋</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Books" value={stats.total_books} color="border-indigo-600" />
              <StatCard title="Issued Books" value={stats.issued_books} color="border-blue-500" />
              <StatCard title="Users" value={stats.total_users} color="border-green-500" />
              <StatCard title="Pending Fines" value={stats.pending_fines} color="border-red-500" />
            </div>
          </>
        )}

        {section === "Add Book" && <AddBook />}
        {section === "Update Book" && <UpdateBook />}
        {section === "Membership" && <Membership />}
        {section === "Reports" && <Reports />}
      </div>
    </div>
  );
}
