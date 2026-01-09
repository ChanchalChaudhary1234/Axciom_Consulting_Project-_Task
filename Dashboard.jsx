import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard({ role, userId }) {
  if (role === "admin") return <AdminDashboard />;
  return <UserDashboard userId={userId} />;
}
