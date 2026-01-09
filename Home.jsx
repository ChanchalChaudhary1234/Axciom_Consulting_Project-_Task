export default function Home({ setPage }) {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Smart Library Management System</h1>
            <p className="text-lg mb-6">
              Manage books, memberships, fines and reports efficiently with a modern digital library system.
            </p>
            <button
              onClick={() => setPage("login")}
              className="bg-amber-400 text-gray-900 px-6 py-3 rounded font-semibold hover:bg-amber-300"
            >
              Get Started
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Library"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
