import React, { useState } from "react";
import { FaSearch, FaChartLine } from "react-icons/fa";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 flex items-center justify-center gap-2">
            <FaChartLine /> AI Financial Advisor
          </h1>
          <p className="text-gray-400 mt-2">Smart insights powered by AI</p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Should I buy Tesla?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition transform hover:scale-105"
          >
            <FaSearch /> Analyze
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6 animate-fade-in">

            {/* Decision Card */}
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold mb-2">
                Decision:
                <span className={
                  result.decision === "BUY" ? "text-green-400 ml-2" :
                  result.decision === "SELL" ? "text-red-400 ml-2" :
                  "text-yellow-400 ml-2"
                }>
                  {result.decision}
                </span>
              </h2>

              <p><strong>Confidence:</strong> {result.confidence}</p>
              <p><strong>Reason:</strong> {result.reason}</p>
            </div>

            {/* News Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Top News</h3>

              <div className="grid gap-4">
                {result.topNews.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:scale-[1.02] hover:shadow-lg transition"
                  >
                    <p className="text-gray-200">{item.text}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Score: {item.score.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;