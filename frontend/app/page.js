"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("Laster dagens visdom...");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://reketino-s-word-of-wisdom.onrender.com/quote");
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Kunne ikke hente visdomsord 😅");
      setAuthor("");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/lotr.jpg')] bg-cover bg-center">
      <div className="bg-black/50 p-10 rounded-3xl text-center max-w-xl shadow-2xl border border-yellow-900">
        <h1 className="text-5xl text-yellow-300 mb-6 font-bold tracking-wide">Dagens visdom</h1>
        <p className="text-3xl text-yellow-100 italic mb-4" style={{ fontFamily: 'LOTR, serif' }}>
          {quote}
        </p>
        <p className="text-2xl text-yellow-400 mb-6" style={{ fontFamily: 'LOTR, serif' }}>
          — {author}
        </p>
        <button
          onClick={fetchQuote}
          className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-800 transition"
        >
          Hent nytt visdomsord
        </button>
      </div>
    </div>
  );
}