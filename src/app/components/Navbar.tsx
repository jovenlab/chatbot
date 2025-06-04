'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full px-6 py-4 shadow flex justify-between items-center bg-blue-600 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <button onClick={logout} className="hover:underline">Logout</button>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
