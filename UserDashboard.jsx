import BookIssue from "./BookIssue";

export default function UserDashboard({ userId }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, User 👋</h1>
      <div className="bg-white p-4 rounded shadow">
        <BookIssue userId={userId} />
      </div>
    </div>
  );
}
