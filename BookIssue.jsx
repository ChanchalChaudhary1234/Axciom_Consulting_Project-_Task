import { useState, useEffect } from "react";

export default function BookIssue({ userId }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/stats") // Fetch books list
      .then(res => res.json())
      .then(data => setBooks(data.books || []))
      .catch(err => console.error(err));
  }, []);

  const issue = async () => {
    if (!selectedBook) { alert("Select a book"); return; }

    await fetch("http://127.0.0.1:8000/issue-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_id: selectedBook,
        user_id: userId,
        issue_date: today,
        return_date: today
      }),
    });
    alert("Book Issued");
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Issue Book</h2>
      <select className="border p-2 w-full mb-2" onChange={e => setSelectedBook(Number(e.target.value))}>
        <option value="">Select Book</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>
      <button onClick={issue} className="bg-blue-500 text-white px-3 py-1 rounded">Issue</button>
    </div>
  );
}
