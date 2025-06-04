'use client'

import { useState } from 'react'
import { SendHorizonal, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const [messages, setMessages] = useState([
    { sender: 'rizal', text: 'Kamusta! I am Jose Rizal. How may I assist you today?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')

    // Placeholder bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'rizal', text: 'That is a thought-provoking question. Let us reflect on our history.' },
      ])
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Jose Rizal Chatbot</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span>Powered by Rizal’s ideas</span>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'rizal'
                ? 'bg-white text-gray-800 self-start shadow'
                : 'bg-blue-600 text-white self-end ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </main>

      {/* Input */}
      <div className="bg-white border-t px-6 py-4 flex items-center gap-4">
        <input
          type="text"
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask Rizal anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
