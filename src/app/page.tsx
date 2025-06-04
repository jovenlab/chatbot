'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello/`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Failed to fetch backend."));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App 👋</h1>
      <p className="text-lg mb-6">This is your Next.js frontend connected to a Django backend.</p>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <p className="text-xl font-medium">Backend Says:</p>
        <p className="mt-2 text-blue-600">{message || 'Loading...'}</p>
      </div>
    </main>
  );
}
