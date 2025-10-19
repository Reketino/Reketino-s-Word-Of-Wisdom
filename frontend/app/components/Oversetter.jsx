"use client";
import { useState } from "react";

export default function Translator({ quote }) {
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const translateQuote = async () => {
    if (!quote) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://reketino-s-word-of-wisdom.onrender.com/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quote, lang: language }),
        }
      );
      const data = await res.json();
      setTranslated(data.translated || "Error translating");
    } catch (err) {
      console.error(err);
      setTranslated("Error translating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
      >
        <option value="no">Norwegian</option>
        <option value="sv">Swedish</option>
        <option value="fi">Finnish</option>
        <option value="en">English</option>
        <option value="ja">Japanese</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>

      <button
        onClick={translateQuote}
        className="bg-yellow-700 text-white px-3 py-1 rounded"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translated && (
        <p className="mt-2 italic text-yellow-100">{translated}</p>
      )}
    </div>
  );
}
