import { useState } from "react";

export default function AddBook({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState(1);

  const submit = async () => {
    if (!title || !author || !copies) {
      alert("All fields mandatory");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/add-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, copies }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Failed to add book");
        return;
      }

      alert("Book Added Successfully! ID: " + data.book_id);

      // Refresh stats
      if (onBookAdded) onBookAdded();

      // Clear form
      setTitle("");
      setAuthor("");
      setCopies(1);
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="border p-4 mb-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg mb-2">Add Book</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-full mb-2"
        placeholder="Copies"
        value={copies}
        onChange={(e) => setCopies(Number(e.target.value))}
      />
      <button
        onClick={submit}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Book
      </button>
    </div>
  );
}
