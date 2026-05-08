"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const fileInputRef = useRef(null);

  const handleAction = () => {
    if (clicks === 0) {
      window.open("https://www.profitablecpmratenetwork.com/fp88w4cu?key=2c0368f539be5d8cad3117658eb622aa", "_blank");
      setShowMsg(true);
      setClicks(1);
    } else {
      fileInputRef.current.click();
      setClicks(0); 
      setShowMsg(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI Image Compressor</h1>
        <p className="text-sm text-slate-400 mb-6">No login required. 100% Free.</p>

        <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 mb-6 hover:border-blue-500 transition-colors">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          <button 
            onClick={handleAction}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-all transform hover:scale-105"
          >
            Upload Image
          </button>
        </div>

        {showMsg && (
          <p className="text-xs text-yellow-400 mt-4 animate-pulse">
            We know ads might be boring 🪴, but we need donations to run the project. Please watch the ad and support us. Click again to upload!
          </p>
        )}
      </div>
      <footer className="mt-8 text-slate-500 text-sm font-medium tracking-wider">
        Created by Rakib bae ⚡️
      </footer>
    </main>
  );
    }
          
