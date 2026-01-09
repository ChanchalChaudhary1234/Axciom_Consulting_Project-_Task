export default function Sidebar({ setSection }) {
  const menu = ["Dashboard", "Add Book", "Update Book", "Membership", "Reports"];
  return (
    <div className="w-64 bg-indigo-700 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
      {menu.map(item => (
        <button key={item} onClick={()=>setSection(item)} className="block w-full text-left px-4 py-2 mb-2 rounded hover:bg-indigo-600">
          {item}
        </button>
      ))}
      <button onClick={()=>window.location.reload()} className="mt-10 w-full bg-red-500 py-2 rounded hover:bg-red-400">Logout</button>
    </div>
  );
}
