"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef(null);

  const triggerVibration = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleAction = () => {
    triggerVibration();
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    triggerVibration();

    const originalSize = (file.size / 1024 / 1024).toFixed(2); 
    setIsLoading(true);
    setStats(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("quality", quality);

    try {
      const res = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const compressedSize = (blob.size / 1024 / 1024).toFixed(2);

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed_by_rakib_bae.webp";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setStats({ original: originalSize, compressed: compressedSize });
        triggerVibration();
      } else {
        alert("Compression failed! 🥲");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      e.target.value = null;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700 max-w-md w-full text-center transform transition-all">
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI Image Compressor</h1>
        <p className="text-sm text-slate-400 mb-8 font-medium">No login required. 100% Free.</p>

        <div className="mb-8 text-left bg-slate-800/60 p-4 rounded-xl border border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-300">Compression Quality</label>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-md">{quality}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={quality} 
            onChange={(e) => setQuality(e.target.value)}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <p className="text-[10px] text-slate-400 mt-2 text-center">Lower % = Smaller size, Higher % = Better clarity</p>
        </div>

        <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 mb-6 hover:border-blue-500 transition-all bg-slate-800/30 active:scale-95">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-3 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
              <p className="text-blue-400 text-sm font-bold animate-pulse tracking-wide">Squeezing size... Preserving 100% quality 🪄</p>
            </div>
          ) : (
            <button 
              onClick={handleAction}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl w-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Upload Image
            </button>
          )}
        </div>

        {showMsg && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl animate-bounce">
            <p className="text-xs text-yellow-400 font-medium">
              We know ads might be boring 🪴, but we need donations to run the project. Please watch the ad and support us. Click again to upload!
            </p>
          </div>
        )}

        {stats && (
          <div className="mt-6 p-5 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border border-slate-600 transform transition-all duration-500 scale-105">
            <p className="text-green-400 font-extrabold mb-3 text-lg">Success! 🎉</p>
            <div className="flex justify-between items-center text-base font-bold bg-slate-900/50 p-3 rounded-lg">
              <span className="text-red-400">{stats.original} MB</span>
              <span className="text-slate-400 text-2xl animate-pulse">➜</span>
              <span className="text-blue-400">{stats.compressed} MB</span>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-10 text-slate-500 text-xs font-bold tracking-widest uppercase">
        Created by Rakib bae ⚡️
      </footer>
    </main>
  );
}
