export default function Navbar({ setPage }) {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => setPage("home")}>
        📚 LibraryMS
      </h1>
      <div className="space-x-6">
        <button onClick={() => setPage("home")} className="hover:text-amber-300">Home</button>
        <button onClick={() => setPage("login")} className="hover:text-amber-300">Login</button>
      </div>
    </nav>
  );
}
