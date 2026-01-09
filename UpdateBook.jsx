import { useState } from "react";

export default function UpdateBook() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({ title: "", author: "", copies: 1 });

  const updateBook = async () => {
    if(!id){ alert("Book ID required"); return; }

    await fetch(`http://127.0.0.1:8000/update-book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Book Updated");
    setId(""); setForm({ title: "", author: "", copies: 1 });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Update Book</h2>

      <input placeholder="Book ID" className="border p-2 w-full mb-2" value={id} onChange={e=>setId(e.target.value)} />
      <input placeholder="Title" className="border p-2 w-full mb-2" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <input placeholder="Author" className="border p-2 w-full mb-2" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} />
      <input type="number" placeholder="Copies" className="border p-2 w-full mb-2" value={form.copies} onChange={e=>setForm({...form, copies:Number(e.target.value)})} />
      <button onClick={updateBook} className="bg-green-600 text-white px-4 py-2 rounded">Update Book</button>
    </div>
  );
}
