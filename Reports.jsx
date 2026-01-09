import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/reports")
      .then(res => res.json())
      .then(setData)
      .catch(err=>console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reports</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Book ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Issue Date</th>
            <th className="border p-2">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.id}>
              <td className="border p-2">{r.book_id}</td>
              <td className="border p-2">{r.user_id}</td>
              <td className="border p-2">{r.issue_date}</td>
              <td className="border p-2">{r.return_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
