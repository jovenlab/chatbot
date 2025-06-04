"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://chatbot-backend-wipk.onrender.com/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return <div>{message || "Loading..."}</div>;
}
