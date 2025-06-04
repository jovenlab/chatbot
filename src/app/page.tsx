'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello/`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("⚠️ Could not reach the backend."));
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      {/* <nav className="w-full px-6 py-4 shadow flex justify-between items-center bg-blue-600 text-white">
        <h1 className="text-xl font-bold">My App</h1>
        <div className="space-x-4">
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
        </div>
      </nav> */}
      <Navbar/>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 py-12 bg-blue-50">
        <h2 className="text-4xl font-bold mb-4">Welcome to My App 👋</h2>
        <p className="text-lg text-gray-700 max-w-xl">
          This is a fullstack app powered by Next.js & Django. Build fast, modern web experiences with powerful backend logic.
        </p>

        <div className="mt-8 bg-white shadow rounded p-6 text-lg text-blue-700">
          <span className="font-semibold">Backend says:</span> {message || 'Loading...'}
        </div>
      </section>
    </main>
  );
}
