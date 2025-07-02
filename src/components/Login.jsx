import { useState } from "react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const correctPassword = import.meta.env.VITE_APP_SECRET_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onLogin();
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800 scale-y-[1.1]">
          🏡 Family Portal 
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="
            w-[99%] p-2 border border-gray-300 rounded scale-y-[1.1]
            mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="
            w-full bg-blue-300 text-white font-semibold py-2 rounded 
            hover:bg-blue-600 transition scale-y-[1.1]"
        >
          Log In
        </button>
      </form>
    </div>
  );
}