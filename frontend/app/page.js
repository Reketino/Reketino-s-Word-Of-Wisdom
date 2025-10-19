"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "./components/musikk";
import Translator from "./components/Oversetter";

export default function Home() {
  const [quote, setQuote] = useState("Laster dagens visdom...");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://reketino-s-word-of-wisdom.onrender.com/quote"
      );
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
    <main className="relative min-h-screen bg-[url('/bakgrunn.jpg')] bg-cover bg-center p-6 flex flex-col items-center justify-center">
      <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-9xl sm:text-[12rem] font-lotr text-yellow-300 drop-shadow-2xl text-center">
        {"Reketino's Words Of Wisdom"}
      </h1>

      <div className="flex flex-col items-center justify-center gap-6 z-10">
        <div className="bg-black/50 p-12 rounded-3xl text-center max-w-xl shadow-2xl border border-yellow-900 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl text-yellow-300 font-lotr mb-2">
            {"Wisdom Of Today"}
          </h2>

          <p
            className="text-2xl sm:text-3xl text-yellow-100 italic"
            style={{ fontFamily: "LOTR, serif" }}
          >
            {quote}
          </p>
          <p className="text-xl sm:text-2xl text-yellow-400">— {author}</p>

          <button
            onClick={fetchQuote}
            className="bg-yellow-700 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition mt-4"
          >
            Get New Word Of Wisdom
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <MusicPlayer />
      </div>
      <Translator />
    </main>
  );
}
